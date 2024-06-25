"use strict";
const { Model, Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const bcrypt = require('bcrypt');

// change from sequelize to datatypes to see autosuggestion they are both the same thing. Only diff is sequelize doesn't give auto suggestion
module.exports = sequelize.define(
  "user",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userType: {
      type: DataTypes.ENUM("0", "1", "2"),
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    confirmPassword: {
      // Using virtual it will not be stored in the database
      type: DataTypes.VIRTUAL,
      set(value){
        if(value === this.password){
          const salt = bcrypt.genSaltSync(10);
          const hashpassword = bcrypt.hashSync(value, salt);
          this.setDataValue('password', hashpassword);
        }else {
          throw new Error('password and confirm password must be the same')
        }
      }
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    paranoid: true, // actual data will not be deleted from the table it will only be deleted from deletedAt etc softdelete feature
    freezeTableName: true, // make it user permanent rather than users
    modelName: "user",
  }
);
