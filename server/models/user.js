const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide your name"],
    maxlength: [40, "Name should be of 40 characters"],
    unique: true,
  },

  mobileNumber: {
    type: String,
    required: [true, "please provide your mobile number"],
    maxlength: [10, "mobile number should be of 10 characters"],
  },

  email: {
    type: String,
    required: [true, "please provide your email"],
    validate: [validator.isEmail, "please enter email in correct format"],
    unique: true,
  },

  password: {
    type: String,
    required: [true, "please provide a password"],
    minlength: [6, "password should be atleast 6 character"],
    select: false
  },
});

// encrypting the password //

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

// validating the password //

userSchema.methods.IsvalidatePassword = async function(usersendPassword) {
    return await bcrypt.compare(usersendPassword, this.password);
};

// creating Jwt tockens //

userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRY,
    });
  };

module.exports = mongoose.model("User", userSchema);
