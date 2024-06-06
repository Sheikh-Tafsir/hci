const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/sequalizeConfig'); // Assuming your Sequelize instance is defined in a separate file
const PermissionModel = require('./PermissionModel'); // Import PermissionModel

const RoleModel = sequelize.define('roles', {
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
//RoleModel.belongsToMany(PermissionModel, { through: 'rolepermissions', foreignKey: 'roleId' });

module.exports = RoleModel;
