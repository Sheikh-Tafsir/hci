const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/sequalizeConfig');
const PermissionModel = require('./PermissionModel');
const RoleModel = require('./RoleModel');

const RolePermissionModel = sequelize.define('rolepermissions', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'role_id'
    },
    permissionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'permission_id'
    }
},
{
    timestamps: false
});

// Define associations
RoleModel.belongsToMany(PermissionModel, {
    through: RolePermissionModel,
    foreignKey: 'roleId',
    otherKey: 'permissionId'
});

PermissionModel.belongsToMany(RoleModel, {
    through: RolePermissionModel,
    foreignKey: 'permissionId',
    otherKey: 'roleId'
});

module.exports = RolePermissionModel;
