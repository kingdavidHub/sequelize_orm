const user = require("../db/models/user.js");

signup = async(req, res, next) => {
  const { userType, firstName, lastName, email, password } = req.body;

  // types of user
  /***
   * 1 ('seller')
   * 2 ('buyer')
   * 3 ('admin') cant do the signup
   */

  

  if (!['1', '2'].includes(userType)) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid user type",
    });
  }

  const newUser = await user.create({
    userType,
    firstName,
    lastName,
    email,
    password
  });

  if(!newUser){
    return res.status(400).json({
      status: "fail",
      message: "Failed to create user",
    });
  }

  return res.status(201).json({
    status: "success",
    newUser
  })
};

module.exports = { signup };
