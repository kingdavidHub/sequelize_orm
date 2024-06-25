const express = require("express");
const Router = express.Router();

const { signup } = require("../controller/authController");

Router.route("/signup").post(signup);


module.exports = Router;