const express = require("express");
const router = express.Router();
const userController = require("../controller/UserController");
const authController = require("../../auth/controller/AuthController");

// get all user
router.get("", userController.getAllUsers);

//create user 
router.post("", authController.create);

//update user by id
router.put("/:id", userController.updateUser);

//delete user by id
router.delete("/:id", userController.deleteUser);

//get all roles
router.get("/roles", userController.getAllRoles);

//update user-role by id
router.put("/:id/roles", userController.updateUserRole);



//get user by id
router.get("/:id", userController.getUsersById);

module.exports = router;
