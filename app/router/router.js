const verifySignUpController = require('../api').verifySignUp;
const verifySignController = require('../api').verifySign;
const verifyJwtTokenController = require('../api').verifyJwtToken;
const historyController = require('../api').history;
const diseaseController = require('../api').disease;

module.exports = function (app) {
  // User Auth
  app.post(
    '/api/auth/signup',
    [verifySignUpController.checkDuplicateUserNameOrEmail,
      verifySignUpController.checkRolesExisted,
    ],
    verifySignController.signup,
  );

  app.post('/api/auth/signin', verifySignController.signin);

  // History
  app.get(
    '/api/histories/:id',
    [verifyJwtTokenController.verifyToken],
    historyController.getHistoryById,
  );

  app.get(
    '/api/histories',
    [verifyJwtTokenController.verifyToken],
    historyController.getAllHistories,
  );

  app.post(
    '/api/histories',
    [verifyJwtTokenController.verifyToken],
    historyController.addHistory,
  );

  // Disease
  app.get(
    '/api/diseases/:id',
    [verifyJwtTokenController.verifyToken, verifyJwtTokenController.isSuperUser],
    diseaseController.getDiseaseById,
  );

  app.get(
    '/api/diseases',
    [verifyJwtTokenController.verifyToken, verifyJwtTokenController.isSuperUser],
    diseaseController.getAllDiseases,
  );

  app.post(
    '/api/diseases',
    [verifyJwtTokenController.verifyToken, verifyJwtTokenController.isSuperUser],
    diseaseController.addDisease,
  );

  app.put(
    '/api/diseases/:id',
    [verifyJwtTokenController.verifyToken, verifyJwtTokenController.isSuperUser],
    diseaseController.updateDiseaseById,
  );

  app.delete(
    '/api/diseases/:id',
    [verifyJwtTokenController.verifyToken, verifyJwtTokenController.isSuperUser],
    diseaseController.deleteDiseaseById,
  );
};
