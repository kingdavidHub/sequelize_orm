signup = (req, res, next) => {
  res.json({
    status: "success",
    msg: "signup route",
  });
};

module.exports = { signup };
