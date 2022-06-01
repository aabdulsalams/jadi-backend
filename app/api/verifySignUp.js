const { User } = require('../models');
const config = require('../config/configRoles.js');

const { ROLEs } = config;

module.exports = {
  checkDuplicateUserNameOrEmail(req, res, next) {
    User.findOne({
      where: {
        username: req.body.username,
      },
    }).then((user) => {
      if (user) {
        res.status(400).send({
          auth: false,
          username: req.body.username,
          message: 'Error',
          errors: 'Username is already taken!',
        });
        return;
      }

      User.findOne({
        where: {
          email: req.body.email,
        },
      }).then((user) => {
        if (user) {
          res.status(400).send({
            auth: false,
            email: req.body.email,
            message: 'Error',
            errors: 'Email is already taken!',
          });
          return;
        }
        next();
      });
    });
  },

  checkRolesExisted(req, res, next) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLEs.includes(req.body.roles[i].toUpperCase())) {
        res.status(400).send({
          auth: false,
          username: req.body.username,
          message: 'Error',
          errors: `Does NOT exist Role = ${req.body.roles[i]}`,
        });
        return;
      }
    }
    next();
  },
};
