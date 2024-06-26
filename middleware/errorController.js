// custom error for development and production

const sendErrorDev = (err, res) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || "error";
  const message = err.message;
  const stack = err.statck;

  res.status(statusCode).json({
    status,
    message,
    stack,
  });
};

const sendErrorProd = (err, res) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || "error";
  const message = err.message;

  // error handled by us inside the app
  if (err.isOperational) {
    return res.status(statusCode).json({
      status,
      message,
    });
  }

  console.log(err.name, err.message, stack)
  // meaning this error is not handled by us anywhere inside the app
  return res.status(500).json({
    status: "error",
    message: "something went very wrong",
  });
};

const globalErrorHandler = (err, req, res, next) => {


  if (process.env.NODE_ENV === "development") {
    return sendErrorDev(err, res);
  }
  return sendErrorProd(err, res);
};

module.exports = globalErrorHandler;
