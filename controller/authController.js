const user = require("../db/models/user.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const signup = async (req, res, next) => {
  const { userType, firstName, lastName, email, password, confirmPassword } =
    req.body;

  // types of user
  /***
   * 1 ('seller')
   * 2 ('buyer')
   * 0 ('admin') cant do the signup
   */

  if (!["1", "2"].includes(userType)) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid user type",
    });
  }
  try {
    const newUser = await user.create({
      userType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    });

    const result = newUser.toJSON();

    delete result.password;
    delete result.deletedAt;

    // result.token = jwt.sign({id: result.id}, process.env.JWT_SECRET, {expiresIn: '1h'});

    result.token = generateToken({ id: result.id });

    if (!result) {
      return res.status(400).json({
        status: "fail",
        message: "Failed to create user",
      });
    }

    return res.status(201).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  // check if email and password exist
  if (!email || !password) {
    return res.status(400).json({
      status: "Failed",
      message: "Please provide email and password",
    });
  }

  try {
    // check if user exist and password is correct
    // if err is thrown from 3-party packages our err handler will not be able to catch it. To handle it we need to use tryCatch block
    const result = await user.findOne({ where: { email } });
    if (!result || !bcrypt.compareSync(password, result.password)) {
      return res.status(401).json({
        status: "Failed",
        message: "Incorrect email or password",
      });
    }

    const token = generateToken({ id: result.id });

    return res.json({
      status: "success",
      token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { signup, login };
