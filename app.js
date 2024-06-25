require("dotenv").config({ path: `${process.cwd()}/.env` });
const express = require("express");

const authRouter = require("./routes/authRoute");

const app = express();

const PORT = process.env.APP_PORT || 5050;

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    msg: "WooHoo! REST APIs",
  });
});

// Middleware

// ThirdParty Middleware

// All Routes
app.use("/api/v1/auth", authRouter);

app.use("*", (req, res, next) => {
  res.status(404).json({
    status: "Fail",
    message: "Route not found",
  });
});

// SERVER

app.listen(PORT, () => {
  console.log(`Server up and running on ${PORT}`);
});
