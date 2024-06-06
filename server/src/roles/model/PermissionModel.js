const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/sequalizeConfig'); // Assuming your Sequelize instance is defined in a separate file
const RoleModel = require('./RoleModel');

const PermissionModel = sequelize.define('permissions', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
  {
      timestamps: false // Disable automatic timestamp tracking
  }
);

// Define association
//PermissionModel.belongsToMany(RoleModel, { through: 'rolepermission', foreignKey: 'permissionId' });
module.exports = PermissionModel;
