// UserModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/sequalizeConfig'); // Assuming your Sequelize instance is defined in a separate file

const UserModel = sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.INTEGER,
      field: 'role_id'
    },
  },
  {
      timestamps: false // Disable automatic timestamp tracking
  }
);

module.exports = UserModel;
