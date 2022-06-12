const { nanoid } = require('nanoid');
const { Disease } = require('../models');

module.exports = {
  getDiseaseById(req, res) {
    return Disease
      .findByPk(req.params.id, {
        include: [],
      })
      .then((dis) => {
        if (!dis) {
          return res.status(404).send({
            status_response: 'Not Found',
            errors: 'Disease Not Found',
          });
        }
        const {
          id, name, description, control,
        } = dis;
        const disease = {
          status_response: 'OK',
          id,
          name,
          description,
          control,
          errors: null,
        };
        return res.status(200).send(disease);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send({
          status_response: 'Bad Request',
          errors: error,
        });
      });
  },

  getAllDiseases(req, res) {
    return Disease
      .findAll({
        limit: 10,
        include: [],
      })
      .then((diss) => {
        const diseases = {
          status_response: 'OK',
          count: diss.length,
          diseases: diss.map((his) => his),
          errors: null,
        };
        res.status(200).send(diseases);
      })
      .catch((error) => {
        res.status(400).send({
          status_response: 'Bad Request',
          errors: error,
        });
      });
  },

  addDisease(req, res) {
    return Disease
      .create({
        id: `disease-${nanoid(16)}`,
        name: req.body.name,
        description: req.body.description,
        control: req.body.control,
        precautions: req.body.precautions,
      })
      .then((dis) => {
        const disease = {
          status_response: 'Disease Added',
          disease: dis,
          errors: null,
        };
        return res.status(201).send(disease);
      })
      .catch((error) => {
        res.status(400).send({
          status_response: 'Bad Request',
          errors: error,
        });
      });
  },

  updateDiseaseById(req, res) {
    return Disease
      .findByPk(req.params.id, {})
      .then((disease) => {
        if (!disease) {
          return res.status(404).send({
            status_response: 'Bad Request',
            errors: 'Disease Not Found',
          });
        }

        return disease
          .update({
            name: req.body.name || disease.name,
            description: req.body.description || disease.description,
          })
          .then((dis) => {
            const diseaseTemp = {
              status_response: 'OK',
              status: dis,
              errors: null,
            };
            return res.status(200).send(diseaseTemp);
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

  deleteDiseaseById(req, res) {
    return Disease
      .findByPk(req.params.id)
      .then((disease) => {
        if (!disease) {
          return res.status(400).send({
            status_response: 'Bad Request',
            errors: 'Disease Not Found',
          });
        }

        return disease
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
