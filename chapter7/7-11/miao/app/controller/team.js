'use strict'

const Controller = require('egg').Controller

class TeamController extends Controller {
    async show(ctx) {
        const team_id = ctx.params.id
        const { Team, Teamstatus, User, Role, Permisstion } = ctx.model
        console.log(ctx.model)
        let data = await Team.findOne({
            where: {
                id: team_id
            },
            include: [{
                    model: Teamstatus,
                    include: [{ model: User }]
                },
                {
                    model: User,
                    include: [{
                        model: Role,
                        include: [{ model: Permisstion }]
                    }]
                }
            ]
        })
        data = data.toJSON()
        for (const index in data.Users) {
            data.Users[index].rolename = data.Users[index].Roles.some(
                    role => role.name == 'team_member'
                ) ?
                '会员' :
                '管理员'
            delete data.Users[index].Roles
        }
        ctx.body = data
    }

    async checkPermission(ctx, user_id) {
        const user = ctx.model.User.findOne({
            where: { id: user_id },
            include: [{
                model: ctx.model.Role
            }]
        })
        const isAdmin = user.Roles.some(role => role.name === 'team_admin')
        ctx.assert(isAdmin, 403)
    }

    /**
     * body: user_id 、team_id
     */
    async member(ctx) {
        const { user_id, team_id } = ctx.request.body
        const { Team, User } = ctx.model
        const current_user_id = ctx.state.user.id
        const team = await Team.findById(team_id)
        this.checkPermission(ctx, current_user_id)
        const member = await User.findById(user_id)
        member.team_id = team.id
        await member.save()
        ctx.body = 'success'
    }

    async search(ctx) {
        const k = ctx.query.k
        const { User } = ctx.model
        const users = await User.findAll({
            where: {
                username: {
                    [ctx.app.Sequelize.Op.like]: '%' + k + '%'
                }
            },
            limit: 6
        })
        ctx.body = users
    }

    async checkCanCreat(ctx) {
        const user_id = ctx.state.user.id
        const user = await ctx.model.User.findById(user_id)
        ctx.body = false
        if (!user.team_id) {
            const onYearAgo = new Date()
            onYearAgo.setFullYear(onYearAgo.getFullYear() - 1)
            const orders = await ctx.model.Order.findAll({
                where: {
                    state: 1,
                    created_at: {
                        [this.ctx.app.Sequelize.Op.lt]: new Date(),
                        [this.ctx.app.Sequelize.Op.gt]: onYearAgo
                    }
                },
                order: ['created_at']
            })
            if (orders.length > 0) {
                ctx.body = true
            }
        }
    }

    async create(ctx) {
        this.checkCanCreat(ctx)
        if (ctx.body === false) {
            ctx.throw(403)
        }
        const { Team, User, Userrole, Role } = ctx.model
        console.log(ctx.model)
        const user = await User.findById(ctx.state.user.id)
        const { name, profile } = ctx.request.body
        const team = await Team.create({
            name,
            profile,
            creater_id: user.id
        })
        const adminRole = await Role.findOne({
            where: {
                name: 'team_admin'
            }
        })
        user.team_id = team.id
        await user.save()
        await Userrole.create({
            role_id: adminRole.id,
            user_id: user.id
        })
        const raw_user = require('ramda').omit(
            ['password', 'created_at', 'updated_at'],
            user.toJSON()
        )
        ctx.body = await ctx.sign_token(raw_user)
    }
}

module.exports = TeamController