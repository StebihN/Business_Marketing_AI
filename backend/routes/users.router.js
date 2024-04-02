const router = require('express').Router();
const authorize = require('../middleware/authorization');
const usersController = require('../controllers/users.controller')

router.get('/:id', authorize, usersController.getDetails);
router.put('/:id', authorize, usersController.updateUser);
router.put('/:id/password', authorize, usersController.updatePassword);

module.exports = router;
