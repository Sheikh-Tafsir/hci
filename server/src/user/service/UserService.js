const PermissionModel = require("../../roles/model/PermissionModel");
const RoleModel = require("../../roles/model/RoleModel");
const UserModel = require("../model/UserModel");
const { Op } = require('sequelize');
const redis = require('../../../config/redisConfig');

const getAllUsers = async() =>{
    try{
        const user = await UserModel.findAll({
            attributes: { exclude: ['password'] } // Exclude the password field
        }); 
        return {
            message: "found all users",
            user:user
        };
    } catch (error) {
        console.error("Error getting all user:", error.message);
        //throw new Error("Internal server error");
        return {
            message: error.message,
        };
    }
};

const getUsersById = async( id ) =>{
    try{
        const user = await UserModel.findOne({
            where: {
                id: id
            },
            attributes: { exclude: ['password'] }
        });
        return {
            message: "found user by id",
            user:user
        };
    } catch (error) {
        console.error("Error getting user by id:", error.message);
        //throw new Error("Internal server error");
        return {
            message: error.message,
        };
    }
};

//update
const updateUser = async (id, name, email) => {
    try {
        // Check if the provided name already exists for another user
        const existingUserWithName = await UserModel.findOne({ where: { name: name, id: { [Op.ne]: id } } });
        if (existingUserWithName) {
            return { message: "User with this name already exists" };
        }

        // Check if the provided email already exists for another user
        const existingUserWithEmail = await UserModel.findOne({ where: { email: email, id: { [Op.ne]: id } }});
        if (existingUserWithEmail) {
            return { message: "User with this email already exists" };
        }

        // Update the user profile
        const updatedUser = await UserModel.update(
            {
              name: name,
              email: email,
            //   role: role,
            },
            { where: { id: id }, returning: true }
        );
      
        if (updatedUser[0] === 0) {
            return { message: "User not found" };
        }

        return {
            message: "User Profile updated",
            user: updatedUser[1][0]
        };
          
    } catch (error) {
        console.error("Error updating profile:", error.message);
        //throw new Error("Internal server error");
        return {
            message: error.message,
        };
    }
};

//delete
const deleteUser = async (id) => {
    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        return {
            message: "user deleted",
            user: deletedUser
        };
    } catch (error) {
        console.error("Error during signup:", error.message);
        //throw new Error("Internal server error");
        return {
            message: error.message,
        };
    }
};

const getAllRoles = async () => {
    try{
        const cachedRoles = await redis.getAsync('allroles');
        
        if(cachedRoles){
            return{
                message: "found all roles",
                roles: JSON.parse(cachedRoles),
            };
        }

        // Fetch roles along with associated permissions
        const roles = await RoleModel.findAll({
            include: PermissionModel, // Include PermissionModel association
        });

        await redis.setAsync('allroles', JSON.stringify(roles));
        //console.log(roles);
        return {
            message: "found all roles",
            roles:roles
        };
    } catch (error) {
        console.error("Error getting all roles:", error.message);
        return {
            message: error.message,
        };
    }
}

//update
const updateUserRole = async (id, role) => {
    try {
        // Update the user profile
        const updatedUser = await UserModel.update(
            {
              role: role,
            },
            { where: { id: id }, returning: true }
        );
      
        if (updatedUser[0] === 0) {
            return { message: "User not found" };
        }

        return {
            message: "User role updated",
            user: updatedUser[1][0]
        };
          
    } catch (error) {
        console.error("Error updating user role:", error.message);
        //throw new Error("Internal server error");
        return {
            message: error.message,
        };
    }
};

module.exports = {
    getAllUsers,
    getUsersById,
    updateUser,
    deleteUser,
    getAllRoles,
    updateUserRole,
}