const { nanoid } = require('nanoid');
const { DiseaseSuggestion } = require('../models');

module.exports = {
  getDiseaseSuggestionById(req, res) {
    return DiseaseSuggestion
      .findByPk(req.params.suggestionId, {
        include: [],
        where: {
          disease_id: req.params.diseaseId,
        },
      })
      .then((dis) => {
        if (!dis) {
          return res.status(404).send({
            status_response: 'Not Found',
            errors: 'Disease Suggestion Not Found',
          });
        }
        const diseaseSuggestion = {
          status_response: 'OK',
          diseaseSuggestion: dis,
          errors: null,
        };
        return res.status(200).send(diseaseSuggestion);
      })
      .catch((error) => {
        res.status(400).send({
          status_response: 'Bad Request',
          errors: error,
        });
      });
  },

  getAllDiseaseSuggestions(req, res) {
    return DiseaseSuggestion
      .findAll({
        limit: 10,
        include: [],
        where: {
          disease_id: req.params.diseaseId,
        },
      })
      .then((diss) => {
        const diseaseSuggestions = {
          status_response: 'OK',
          count: diss.length,
          diseaseSuggestions: diss.map((dis) => dis),
          errors: null,
        };
        res.status(200).send(diseaseSuggestions);
      })
      .catch((error) => {
        res.status(400).send({
          status_response: 'Bad Request',
          errors: error,
        });
      });
  },

  addDiseaseSuggestion(req, res) {
    return DiseaseSuggestion
      .create({
        id: `diseaseSuggestion-${nanoid(16)}`,
        disease_id: req.params.diseaseId,
        suggestion: req.body.suggestion,
      })
      .then((dis) => {
        const diseaseSuggestion = {
          status_response: 'Disease Suggestion Added',
          diseaseSuggestion: dis,
          errors: null,
        };
        return res.status(201).send(diseaseSuggestion);
      })
      .catch((error) => {
        res.status(400).send({
          status_response: 'Bad Request',
          errors: error,
        });
      });
  },

  updateDiseaseSuggestionById(req, res) {
    return DiseaseSuggestion
      .findByPk(req.params.suggestionId, {
        where: {
          disease_id: req.params.diseaseId,
        },
      })
      .then((diseaseSuggestion) => {
        if (!diseaseSuggestion) {
          return res.status(404).send({
            status_response: 'Bad Request',
            errors: 'Disease Not Found',
          });
        }

        return diseaseSuggestion
          .update({
            suggestion: req.body.suggestion || diseaseSuggestion.suggestion,
          })
          .then((dis) => {
            const diseaseSuggestionTemp = {
              status_response: 'OK',
              status: dis,
              errors: null,
            };
            return res.status(200).send(diseaseSuggestionTemp);
          })
          .catch((error) => {
            res.status(400).send({
              status_response: 'Bad Request',
              errors: error,
            });
          });
      })
      .catch((error) => {
        res.status(400).send({
          status_response: 'Bad Request',
          errors: error,
        });
      });
  },

  deleteDiseaseSuggestionById(req, res) {
    return DiseaseSuggestion
      .findByPk(req.params.suggestionId, {
        include: [],
        where: {
          disease_id: req.params.diseaseId,
        },
      })
      .then((diseaseSuggestion) => {
        if (!diseaseSuggestion) {
          return res.status(400).send({
            status_response: 'Bad Request',
            errors: 'Disease Suggestion Not Found',
          });
        }

        return diseaseSuggestion
          .destroy()
          .then(() => res.status(200).send({
            status_response: 'OK',
            errors: null,
          }))
          .catch((error) => {
            res.status(400).send({
              status_response: 'Bad Request',
              errors: error,
            });
          });
      })
      .catch((error) => {
        res.status(400).send({
          status_response: 'Bad Request',
          errors: error,
        });
      });
  },
};
