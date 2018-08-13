'use strict';

exports.keys = '123456';

exports.data = [];

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
        return ctx.app.config.data.push(data);
    },
    async auth(ctx) {
        return true;
    },
    async getData(ctx) {
        return ctx.app.config.data;
    },
    pathUrl: '/tracer/_report'
};
