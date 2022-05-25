const jwt = require('jsonwebtoken');
const config = require('../config/configRoles.js');
const { User } = require('../models');

module.exports = {
  verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(403).send({
        auth: false,
        message: 'Error',
        errors: 'No token provided',
      });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(500).send({
          auth: false,
          message: 'Error',
          errors: err,
        });
      }
      req.userId = decoded.id;
      next();
    });
  },

  isSuperUser(req, res, next) {
    User.findByPk(req.userId)
      .then((user) => {
        user.getRoles().then((roles) => {
          for (let i = 0; i < roles.length; i++) {
            if (roles[i].name.toUpperCase() === 'SUPERUSER') {
              next();
              return;
            }
          }
          res.status(403).send({
            auth: false,
            message: 'Require Super User Role',
            errors: ''
          });
        });
      });
  },
};
