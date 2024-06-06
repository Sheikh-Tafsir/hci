const express = require("express");
const router = express.Router();
const vehicleController = require("../controller/VehicleController");

// login user
router.post("/add", vehicleController.addVehicle);

module.exports = router;