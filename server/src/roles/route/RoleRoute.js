const express = require("express");
const router = express.Router();
const roleController = require("../controller/RoleController");


//create role
router.post("/roles", roleController.createRole);

//create permission
router.get("/permissions", roleController.getAllPermissions);

//create permission
router.post("/permissions", roleController.createPermission);

//grant permission
router.post("/roles/:roleId/permissions", roleController.assignPermission);



module.exports = router;