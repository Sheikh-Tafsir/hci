const RoleService = require('../service/RoleService');    

//create role
const createRole = async (req, res) => {
  //console.log(req.body);
    try {
      const { name } = req.body;
      // console.log(req.body);

      const roleService = await RoleService.createRole(name);        
      res.status(201).json(roleService);

    } catch (error) {
      console.error("Error creating role:", error.message);
      res.status(500).json({ error: error.message });
    }
}; 


//create role
const createPermission = async (req, res) => {
    //console.log(req.body);
      try {
        const { name } = req.body;
        // console.log(req.body);
  
        const roleService = await RoleService.createPermission(name);        
        res.status(201).json(roleService);
  
      } catch (error) {
        console.error("Error creating permission:", error.message);
        res.status(500).json({ error: error.message });
      }
  }; 

  //create role
const assignPermission = async (req, res) => {
  //console.log(req.body);
    try {
      const roleId = req.params.roleId;
      const { permissionId } = req.body;
      console.log(req.body);
      console.log(roleId);

      const roleService = await RoleService.assignPermission(roleId, permissionId);        
      res.status(201).json(roleService);


    } catch (error) {
      console.error("Error assigning permission:", error.message);
      res.status(500).json({ error: error.message });
    }
};

//get list of roles
// const getAllRoles = async (req, res) => {
//   try {
//     const roleService = await RoleService.getAllRoles();
//     res.status(200).json(roleService);
//   } catch (error) {
//     console.error("Error getting all permissions:", error.message);
//     res.status(500).json({ error: error.message });
//   }
// }; 

//get list of permissions
const getAllPermissions = async (req, res) => {
      try {
        const roleService = await RoleService.getAllPermissions();
        res.status(200).json(roleService);
      } catch (error) {
        console.error("Error getting all permissions:", error.message);
        res.status(500).json({ error: error.message });
      }
}; 
module.exports = { 
    createRole,
    createPermission,
    assignPermission,
    // getAllRoles,
    getAllPermissions,
}