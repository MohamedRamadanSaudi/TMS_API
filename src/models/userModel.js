const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please tell us your name'],
    },
    role: {
      type: String,
      enum: ['admin', 'subAdmin'],
      default: 'subAdmin',
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      select: false,
    },
    confirm_password: {
      type: String,
      required: [true, 'Please confirm your password'],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: 'Passwords do not match!',
      },
    },
  },
  {
    timestamps: true,
  },
);

// Hash the password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.confirm_password = undefined; // Do not store confirm_password
  next();
});

module.exports = mongoose.model('User', UserSchema);
