const express = require("express");
const router = express.Router();
const authController = require("../controller/AuthController");

// login user
router.post("/login", authController.login);

//signup user
router.post("/create", authController.create);

//logout user
router.post("/logout", authController.logout);

//forgot password
router.post("/reset-password/initiate", authController.forgotPassword);

//reset password
router.put("/reset-password/confirm", authController.resetPassword);

//change password
router.put("/change-password", authController.changePassword);

module.exports = router;
