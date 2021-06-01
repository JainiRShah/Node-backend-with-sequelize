const { GeneralResponse } = require("../utils/response");
const { GeneralError, NotFound } = require("../utils/error");
const config = require("../utils/config");
const {addDetails, updateDetails} = require("../validations/userValidation")
const db = require("../models/sequelize");
const User = db.details;

const logger = require('../loggers/logger')
const {
  mailSend
} = require("../services/mail");
const {
  smsSend
} = require("../services/sms");
const {
  upload
} = require("../services/multer");

// Create and Save a new User
exports.addUserDetails = async (req, res, next) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        logger.error("err", err)
      }
      const { error } = addDetails(req.body); 
      if(error){
          await next(
            new GeneralError(
              "Validation error",
              error.details
            )
          );
      }else{
      // Create a User
      const user = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        gender: req.body.gender,
        hobbies: req.body.hobbies,
        country: req.body.country,
        address: req.body.address,
        pincode: req.body.pincode,
        image: req.file.originalname,
        date: req.body.date
      };

      // Save Users in the database
      const value = await User.create(user)
      if (value) {
        await mailSend(req.body.email, req.body.name);
        await smsSend(req.body.name, req.body.phone);
        await next(
          new GeneralResponse(
            "user added details successfully",
            value,
            config.HTTP_CREATED
          )
        );
      }
    }
    });
  
  }
  catch (err) {
    logger.error("err", err)
    next(new GeneralError("user details added failed"));
  }
};

// Retrieve all users from the database.
exports.list = async (req, res, next) => {
  try {
    const user = await User.findAll()
    if (user) {
      await next(new GeneralResponse('user detail found', user))
    }

    await next(new NotFound('user not found'));

  }
  catch (err) {
    next(new GeneralError('error while getting user detail'))
  }
}


exports.getUserByUserId = async (req, res, next) => {
  const id = req.query.id;
  try {
    const user = await User.findByPk(id)
    if (user) {
      await next(new GeneralResponse('user detail found', user))
    }

    await next(new NotFound('user not found'));

  } catch (err) {
    next(new GeneralError('error while getting user detail'))
  }
}


exports.updateUserDetails = async (req, res, next) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        logger.error("err", err)
      }
      const { error } = updateDetails(req.body); 
      if(error){
          await next(
            new GeneralError(
              "Validation error",
              error.details
            )
          );
      }else{
      const user = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        gender: req.body.gender,
        hobbies: req.body.hobbies,
        country: req.body.country,
        address: req.body.address,
        pincode: req.body.pincode,
        date: req.body.date
      };
      if (req.file) {
        user.image = req.file.originalname
      }
      const updateUser = await User.update(user, {
        where: { id: req.body.id }
      })
      if (updateUser) {
        await next(
          new GeneralResponse(
            "User updated details successfully",
            updateUser,
            config.HTTP_CREATED
          )
        );
      }
      else {
        await next(new GeneralError("user details updation failed"));
      }
    }
    });
  }
  catch (err) {
    logger.error("err", err)
    next(new GeneralError("user registeration failed"));
  }
};

exports.deleteUserDetails = async (req, res, next) => {
  const id = req.query.id;
  try {
    const deleteUser = await User.destroy({ where: { id: id } })
    if (deleteUser) {
      next(new GeneralResponse('"User was deleted successfully!"', data))
    }
    else {
      next(new NotFound('user not found'));
    }
  } catch (err) {
    next(new GeneralError('error while deleting user detail'))
  }
}
