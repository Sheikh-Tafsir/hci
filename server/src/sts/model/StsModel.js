// UserModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/sequalizeConfig'); // Assuming your Sequelize instance is defined in a separate file

const StsModel = sequelize.define('sts', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    wardNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'ward_number'
      },
      capacityInTonnes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'capacity_in_tonnes'
      },
      latitude: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      longitude: {
        type: DataTypes.FLOAT,
        allowNull: false
      }
  },
  {
      timestamps: false // Disable automatic timestamp tracking
  }
);

module.exports = StsModel;
