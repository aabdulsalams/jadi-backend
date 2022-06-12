const { nanoid } = require('nanoid');
const { History, Disease, Sequelize } = require('../models');
const uploadImage = require('../helpers/helpers');

module.exports = {
  getHistoryById(req, res) {
    return History
      .findByPk(req.params.id, {
        include: [{
          model: Disease,
          as: 'disease',
          attributes: [],
        }],
        attributes: {
          include: [[Sequelize.col('name'), 'disease_name'], [Sequelize.col('description'), 'disease_description'], [Sequelize.col('control'), 'disease_control']],
        },
        where: {
          user_id: req.userId,
        },
      })
      .then((his) => {
        console.log(his);
        if (!his) {
          return res.status(404).send({
            status_response: 'Not Found',
            errors: 'History Not Found',
          });
        }
        const history = {
          status_response: 'OK',
          history: his,
          errors: null,
        };
        return res.status(200).send(history);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send({
          status_response: 'Bad Request',
          errors: error,
        });
      });
  },

  getAllHistories(req, res) {
    return History
      .findAll({
        limit: 50,
        include: [{
          model: Disease,
          as: 'disease',
          attributes: [],
        }],
        attributes: {
          include: [[Sequelize.col('name'), 'disease_name']],
        },
        where: {
          user_id: req.userId,
        },
        order: [
          ['scan_date', 'DESC'],
        ],
      })
      .then((hiss) => {
        const histories = {
          status_response: 'OK',
          count: hiss.length,
          histories: hiss.map((his) => his),
          errors: null,
        };
        res.status(200).send(histories);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send({
          status_response: 'Bad Request',
          errors: error,
        });
      });
  },

  async addHistory(req, res) {
    let imageUrl = null;
    try {
      const myFile = req.file;
      imageUrl = await uploadImage(myFile);
    } catch (error) {
      console.log(error);
    } finally {
      Disease.findOne({
        where: {
          name: req.body.name,
        },
      }).then((disease) => {
        if (!disease) {
          return res.status(400).send({
            auth: false,
            name: req.body.name,
            message: 'Error',
            errors: 'Disease Not Found',
          });
        }
        console.log(imageUrl);
        return History
          .create({
            id: `history-${nanoid(16)}`,
            user_id: req.userId,
            disease_id: disease.id,
            image_url: imageUrl,
            scan_date: new Date(),
          })
          .then((his) => {
            const history = {
              status_response: 'History Added',
              history: his,
              errors: null,
            };
            return res.status(201).send(history);
          })
          .catch((error) => {
            res.status(400).send({
              status_response: 'Bad Request',
              errors: error,
            });
          });
      })
        .catch((error) => {
          console.log(error);
        });
    }
  },
};
