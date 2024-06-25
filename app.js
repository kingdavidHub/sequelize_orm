require("dotenv").config({ path: `${process.cwd()}/.env` });
const express = require("express");


// Custom Utilities
const authRouter = require("./routes/authRoute");
const catchAsync = require("./utils/catchAsync");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./middleware/errorController");

const app = express();

const PORT = process.env.APP_PORT || 5050;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Custom Middleware

// All Routes
app.use("/api/v1/auth", authRouter);

app.use(
  "*",
  catchAsync(async (req, res, next) => {
    // if a function is async the global error handler is not catching the err except we do this

    // Method 1
    // return next(new Error("This is error")); // the global error handler is catching the err

    // Method 2
    // throw new Error("this is error"); // using the wrapper global error handler can now catch it with async function

    // Using custom AppError
    throw new AppError("This is error", 404);
  })
);

// Express global err handler
app.use(globalErrorHandler);

// SERVER
app.listen(PORT, () => {
  console.log(`Server up and running on ${PORT}`);
});
