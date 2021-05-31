const express = require("express");
const router = express.Router();
const {validator} = require("../helpers/validator");
const authController = require("../controllers/authController");
const authValidation = require("../validations/authValidation");
const userValidation = require("../validations/userValidation");
const usersController = require("../controllers/userController");
const { authenticate } = require('../helpers/auth');

router.post("/login", validator.body(authValidation.login), authController.login);
router.post("/register", validator.body(authValidation.register), authController.register);
router.get("/list",authenticate, usersController.list);
router.get("/listById",authenticate, validator.query(userValidation.listById), usersController.getUserByUserId);
router.post("/addUserDetails", authenticate, usersController.addUserDetails);
router.put("/updateDetails", authenticate,usersController.updateUserDetails);
router.delete("/deleteUserDetails", authenticate,validator.query(userValidation.delete), usersController.deleteUserDetails);

module.exports = router;
