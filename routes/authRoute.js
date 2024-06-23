import express from "express";
import { signup } from "../controller/authController.js";

const Router = express.Router();


Router.route("/signup").post(signup)


export default Router;