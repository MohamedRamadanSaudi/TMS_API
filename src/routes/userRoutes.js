const express = require('express');
const userController = require('../controllers/userController');
const { auth, isAdmin } = require('../middlewares/AuthMiddleware');

const router = express.Router();

// Login route
router.post('/login', userController.login);

router
  .route('/')
  .get(auth, isAdmin, userController.getAllUsers)
  .post(auth, isAdmin, userController.createUser);

router
  .route('/:id')
  .get(auth, userController.getUser)
  .patch(auth, userController.updateUser)
  .delete(auth, isAdmin, userController.deleteUser);

module.exports = router;
