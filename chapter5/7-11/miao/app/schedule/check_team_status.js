'use strict'

const Subscription = require('egg').Subscription

class TeamStatusChecker extends Subscription {
    static get schedule() {
        return {
            interval: '5s',
            type: 'worker'
        }
    }

    async subscribe() {
        const onYearAgo = new Date()
        onYearAgo.setFullYear(onYearAgo.getFullYear() - 1)
        const teams = await this.ctx.model.Team.findAll({
            include: [{
                model: this.ctx.model.User,
                as: 'creater'
            }]
        })
        for (const team of teams) {
            const user_id = team.creater.id
            const orders = await this.ctx.model.Order.findAll({
                where: {
                    user_id,
                    state: 1,
                    created_at: {
                        [this.ctx.app.Sequelize.Op.lt]: new Date(),
                        [this.ctx.app.Sequelize.Op.gt]: onYearAgo
                    }
                },
                order: ['created_at']
            })
            if (orders.length === 0 && team.lock === false) {
                team.lock = true
                await team.save()
                console.log(team.name + '  LOCK')
            } else {
                team.lock = false
                await team.save()
                console.log(team.name + '  OPEN')
            }
        }
    }
}

module.exports = TeamStatusChecker