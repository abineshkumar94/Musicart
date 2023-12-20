const User = require("../models/user");
const BigPromise = require("../middlewars/BigPromise");
const cookieToken = require("../utils/cookieToken");

exports.signup = BigPromise(async (req, res, next) => {
  const { name, mobileNumber, email, password } = req.body;

  if (!name || !mobileNumber || !email || !password) {
    return next(new Error("name, mobileNumber, email, password are required"));
  }

  const user = await User.create({
    name,
    mobileNumber,
    email,
    password,
  });

  cookieToken(user, res);
});

// login controled route //

exports.login = BigPromise(async (req, res, next) => {
  const { email, password } = req.body;

  // check for presence of email and password

  if (!email || !password) {
    return next(new Error("please provide email and password"));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new Error("you are not register in our database"));
  }

  //conforming the password correct or not //

  const IsPasswordCorrect = await user.IsvalidatePassword(password);

  if (!IsPasswordCorrect) {
    return next(new Error("Email or Password does not match or exist"));
  }

  cookieToken(user, res);
});

// logout controled route //

exports.logout = BigPromise(async(req, res, next) => {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(200).json({
      sucess: true,
      message: "Logout success",
    });
});
