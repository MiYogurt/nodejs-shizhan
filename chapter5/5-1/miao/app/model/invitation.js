'use strict';
module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;
  const Invitation = app.model.define('Invitation', {
    code: STRING(8),
    user_id: INTEGER,
    use_user_id: INTEGER,
    use_username: STRING(40),
  });

  return Invitation;
};
