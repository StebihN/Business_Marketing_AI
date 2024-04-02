const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const validEmail = require('../middleware/validEmail');

router.post('/register', authController.Register);
router.post('/login', validEmail, authController.Login);

module.exports = router;