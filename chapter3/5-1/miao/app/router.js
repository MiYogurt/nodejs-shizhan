'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const api = router.prefix('/api/v1');
  api.get('/home', controller.home.index);
};
