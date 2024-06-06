const express = require("express");
const router = express.Router();
const profileController = require("../controller/ProfileController");

//get user
router.get("/", profileController.getUser);

//update user 
router.put("/", profileController.updateUser);

module.exports = router;