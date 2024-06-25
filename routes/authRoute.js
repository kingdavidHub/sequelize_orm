const express = require("express");
const Router = express.Router();

const { signup, login } = require("../controller/authController");

Router.route("/signup").post(signup);
Router.route("/login").post(login);


module.exports = Router;