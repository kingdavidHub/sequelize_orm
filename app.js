require("dotenv").config({ path: `${process.cwd()}/.env` });
const express = require("express");

const authRouter = require("./routes/authRoute");

const app = express();

const PORT = process.env.APP_PORT || 5050;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
