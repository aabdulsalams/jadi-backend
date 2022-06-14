const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { nanoid } = require('nanoid');
const db = require('../models/index');
const { User } = require('../models');
const { Role } = require('../models');

const { Op } = db.Sequelize;
const config = require('../config/configRoles');

module.exports = {
  signup(req, res) {
    const tempRole = ['USER'];

    return User
      .create({
        id: `user-${nanoid(16)}`,
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
      }).then((user) => {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles || tempRole,
            },
          },
        }).then((roles) => {
          user.setRoles(roles).then(() => {
            res.status(200).send({
              auth: true,
              username: req.body.username,
              message: 'User registered successfully!',
              errors: null,
            });
          });
        }).catch((err) => {
          res.status(500).send({
            auth: false,
            message: 'Error',
            errors: err,
          });
        });
      }).catch((err) => {
        res.status(500).send({ message: err.message });
      });
  },

  signin(req, res) {
    return User
      .findOne({
        where: {
          username: req.body.username,
        },
      }).then((user) => {
        if (!user) {
          return res.status(404).send({
            auth: false,
            username: req.body.username,
            accessToken: null,
            message: 'Error',
            errors: 'User Not Found.',
          });
        }

        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) {
          return res.status(401).send({
            auth: false,
            username: req.body.username,
            accessToken: null,
            message: 'Error',
            errors: 'Invalid Password!',
          });
        }

        const token = `${jwt.sign({
          id: user.id,
        }, config.secret, {
          // expiresIn: 86400, // 24 Hours
        })}`;

        const userResult = {
          id: user.id,
          username: user.username,
          accessToken: token,
        };

        res.status(200).send({
          auth: true,
          message: 'Authentication Success',
          errors: null,
          userResult,
        });
      }).catch((err) => {
        res.status(500).send({ message: err.message });
      });
  },

  signout(req, res) {
    const bearerHeader = req.headers.authorization;

    jwt.sign(bearerHeader, '', { expiresIn: 1 }, (logout, err) => {
      if (logout) {
        res.status(200).send({
          auth: false,
          message: 'You have been Logged Out',
          errors: null,
        });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
  },
};
