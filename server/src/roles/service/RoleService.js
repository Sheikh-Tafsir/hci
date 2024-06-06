const RoleModel = require("../model/RoleModel");
const PermissionModel = require("../model/PermissionModel");
const RolePermissionModel = require("../model/RolePermissionModel");

const redis = require('../../../config/redisConfig');

//signup
const createRole = async (name) => {
    try {
        // Check if the email is already taken
        const existingUserByName = await RoleModel.findOne({ where: { name: name } });
        if (existingUserByName) {
            return { message: "Name already taken" };
        }

        // Create the user
        const roleModel = await RoleModel.create({
            name:name,
        });

        return {
            message: "Role Creation successful",
            role: roleModel,
        };
    } catch (error) {
        console.error("Error creating role:", error.message);
        //throw new Error("Internal server error");
        return {
            message: error.message,
        };
    }
};

//create permission
const createPermission = async (name) => {
    try {
        // Check if the email is already taken
        const existingUserByName = await PermissionModel.findOne({ where: { name: name } });
        if (existingUserByName) {
            return { message: "Name already taken" };
        }

        // Create the user
        const roleModel = await PermissionModel.create({
            name:name,
        });

        return {
            message: "Permission creation successful",
            role: roleModel,
        };
    } catch (error) {
        console.error("Error creating permission:", error.message);
        //throw new Error("Internal server error");
        return {
            message: error.message,
        };
    }
};

//assign permission
const assignPermission = async (roleId, permissionId) => {
    try {
        // Check if the email is already taken
        const existingAssignment = await RolePermissionModel.findOne({ 
            where: { 
                roleId: roleId,
                permissionId: permissionId
            } 
        });
        if (existingAssignment) {
            return { message: "Permission already assigned to this role" };
        }
        // Create the user
        const rolePermissionModel = await RolePermissionModel.create({
            roleId: roleId,
            permissionId: permissionId
        });

        return {
            message: "Permission assigned",
            role: rolePermissionModel,
        };
    } catch (error) {
        console.error("Error granting permission:", error);
        //throw new Error("Internal server error");
        return {
            message: error.message,
        };
    }
};

// const getAllRoles = async () => {
//     try{
        
//         const cachedRoles = await redis.getAsync('allroles');
        
//         if(cachedRoles){
//             console.log('redis cache');
//             return{
//                 message: "found all role",
//                 roles: JSON.parse(cachedRoles),
//             };
//         }
//         console.log('not redis cache');
//         const roleModel = await RoleModel.findAll();
//         await redis.setAsync('allRoles', JSON.stringify(roleModel));
//         return {
//             message: "found all role",
//             roles: roleModel,
//         };
//     } catch (error) {
//         console.error("Error getting all roles:", error.message);
//         return {
//             message: error.message,
//         };
//     }
// }

const getAllPermissions = async () => {
    try{
        const cachedPermissions = await redis.getAsync('allpermissions');
        if(cachedPermissions){
            return {
                message: "found all permissions",
                permissions: cachedPermissions,
            };
        }

        const permissionModel = await PermissionModel.findAll();
        await redis.setAsync('allpermissions', JSON.stringify(permissionModel));
        return {
            message: "found all permissions",
            permissions: permissionModel,
        };
    } catch (error) {
        console.error("Error getting all permissions:", error.message);
        return {
            message: error.message,
        };
    }
}

module.exports = { 
    createRole,
    createPermission,
    assignPermission,
    // getAllRoles,
    getAllPermissions,
}