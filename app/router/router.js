const verifySignUpController = require('../api').verifySignUp;
const verifySignController = require('../api').verifySign;
const verifyJwtTokenController = require('../api').verifyJwtToken;
const historyController = require('../api').history;

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
};
