const bcrypt = require("bcrypt");
const {
  generateToken
} = require("../helpers/auth");
const db = require("../models/sequelize");
const User = db.authuser;
const { GeneralResponse } = require("../utils/response");
const { GeneralError } = require("../utils/error");
const config = require("../utils/config");
const saltRounds = 10;
const logger = require('../loggers/logger');

exports.register = async (req, res, next) => {
  try {

    logger.info("req.body", req.body)
    const encryptedPassword = await bcrypt.hash(req.body.password, saltRounds);
    const value = {
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      password: encryptedPassword,
    };
    const query1 = await User.findOne({ where: { email: req.body.email } })
    if (query1 == null) {
      await User.create(value)
      await next(
        new GeneralResponse(
          "user successfully registered",
          undefined,
          config.HTTP_CREATED
        )
      );
    } else {
      await next(
        new GeneralError(
          "user already exist",
          undefined,
          config.HTTP_ACCEPTED
        )
      );
    }
  } catch (err) {
    logger.error("err", err)
    next(new GeneralError("user registeration failed"));
  }
};

exports.login = async (req, res, next) => {
  try {
    logger.info(req.body)
    const value = await User.findOne({ where: { email: req.body.email } })
    if (value) {
      const originalPass = value.password
      const comparision = await bcrypt.compare(req.body.password, originalPass)
      if (comparision) {
        let userdata = {
          username: value.email,
          fname: value.fname,
          lname: value.lname,
          userid: value.userid,
        };
        let token = generateToken(userdata);
        await next(
          new GeneralResponse("user successfully login", { token: token }, config.HTTP_SUCCESS));
      }
      else {
        await next(new GeneralError("Password is incorrect", undefined, config.HTTP_ACCEPTED));
      }
    }
    else {
      await next(new GeneralError("user not found", undefined, config.HTTP_ACCEPTED));
    }

  } catch (err) {
    next(new GeneralError("user login failure"));
  }
};