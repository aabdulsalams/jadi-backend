const { nanoid } = require('nanoid');
const History = require('../models').History;

module.exports = {
  getHistoryById(req, res) {
    return History
      .findByPk(req.params.id, {
        include: [],
      })
      .then((his) => {
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
        res.status(400).send({
          status_response: 'Bad Request',
          errors: error,
        });
      });
  },

  getAllHistories(req, res) {
    return History
      .findAll({
        limit: 10,
        include: [],
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
        res.status(400).send({
          status_response: 'Bad Request',
          errors: error,
        });
      });
  },

  addHistory(req, res) {
    return History
      .create({
        id: `history-${nanoid(16)}`,
        user_id: req.userId,
        disease_id: req.body.disease_id,
        scan_date: new Date(),
      })
      .then((his) => {
        const status = {
          status_response: 'History Added',
          history: his,
          errors: null,
        };
        return res.status(201).send(status);
      })
      .catch((error) => {
        res.status(400).send({
          status_response: 'Bad Request',
          errors: error,
        });
      });
  },
};
