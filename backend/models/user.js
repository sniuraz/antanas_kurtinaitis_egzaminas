const mongoose = require('mongoose');

const useSchema = new mongoose.Schema(
  {
    name: { type: String, require: true, minlength: 3, maxlength: 30 },
    email: { type: String, require: true, minlength: 3, maxlength: 200, unique: true },
    password: { type: String, require: true, minlength: 3, maxlength: 1024 },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = mongoose.model('User', useSchema);

exports.User = User;
