const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const auth = catchAsync(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('You are not logged in! Please log in to get access.', 401));
  }

  // Verify the token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(new AppError('The user belonging to this token no longer exists.', 401));
    }
    req.user = currentUser;
    next();
  } catch (error) {
    return next(new AppError('JWT malformed', 500));
  }
});

const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return next(new AppError('You do not have permission to perform this action', 403));
  }
  next();
};

module.exports = { auth, isAdmin };
