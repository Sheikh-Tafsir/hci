const express = require("express");
const router = express.Router();
const stsController = require("../controller/StsController");

// login user
router.post("/add", stsController.addSts);

module.exports = router;