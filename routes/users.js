const express = require('express');
const userController = require('../controllers/users.controller');
const checkAuthMiddleware = require('../middleware/check-auth');

const router = express.Router();

router.post('/signUp',userController.signUp);
router.post('/login',userController.login);
router.post('/profile', checkAuthMiddleware.checkAuth,userController.profile);

module.exports = router;