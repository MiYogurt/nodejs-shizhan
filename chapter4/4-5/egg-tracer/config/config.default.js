'use strict';

/**
 * egg-tracer default config
 * @member Config#tracer
 * @property {String} SOME_KEY - some description
 */
exports.tracer = {
    getUser(ctx) {
        return ctx.session.user || '';
    },

    getIp(ctx) {
        if (ctx.app.config.proxy && ctx.request.ips) {
            return ctx.request.ips;
        }
        return ctx.request.ip || '';
    },
    async save(ctx, data) {
        if (ctx.model && ctx.model.Tracer) {
            return await ctx.model.Tracer.create(data);
        }
        return;
    },
    async auth(ctx) {
        return true;
    },
    async getData(ctx) {
        if (ctx.model && ctx.model.Tracer) {
            return await ctx.model.Tracer.findAll();
        }
        return [];
    },
    pathUrl: '/tracer/_report'
};
