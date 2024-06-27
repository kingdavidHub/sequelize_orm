const user = require("../db/models/user.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const catchAsync = require("../utils/catchAsync.js");
const AppError = require("../utils/appError.js");

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const signup = catchAsync(async (req, res, next) => {
  const { userType, firstName, lastName, email, password, confirmPassword } =
    req.body;

  // types of user
  /***
   * 1 ('seller')
   * 2 ('buyer')
   * 0 ('admin') cant do the signup
   */

  if (!["1", "2"].includes(userType)) {
    throw new AppError("Invalid user type", 400);
  }

  const newUser = await user.create({
    userType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  });

  if (!newUser) {
    return next(new AppError("Failed to create user", 400));
  }

  const result = newUser.toJSON();

  delete result.password;
  delete result.deletedAt;

  // result.token = jwt.sign({id: result.id}, process.env.JWT_SECRET, {expiresIn: '1h'});

  result.token = generateToken({ id: result.id });

  return res.status(201).json({
    status: "success",
    data: result,
  });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // check if email and password exist
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  // check if user exist and password is correct
  // if err is thrown from 3-party packages our err handler will not be able to catch it. To handle it we need to use tryCatch block
  const result = await user.findOne({ where: { email } });
  if (!result || !bcrypt.compareSync(password, result.password)) {
    return next(new AppError("Incorrect email or password", 401));
  }

  const token = generateToken({ id: result.id });

  return res.json({
    status: "success",
    token,
  });
});

module.exports = { signup, login };
