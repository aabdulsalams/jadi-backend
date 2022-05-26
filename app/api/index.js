const verifySign = require('./verifySign');
const verifySignUp = require('./verifySignUp');
const verifyJwtToken = require('./verifyJwtToken');
const history = require('./history');
const disease = require('./disease');
const diseaseSuggestion = require('./diseaseSuggestion');

module.exports = {
  verifySign,
  verifySignUp,
  verifyJwtToken,
  history,
  disease,
  diseaseSuggestion,
};
