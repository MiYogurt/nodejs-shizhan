module.exports = app => {
    const index = app.config.coreMiddleware.indexOf('session');
    app.config.coreMiddleware.splice(index, 0, 'tracer');
};
