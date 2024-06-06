// UserModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/sequalizeConfig'); // Assuming your Sequelize instance is defined in a separate file

const VehicleModel = sequelize.define('vehicles', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    registrationNo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'registration_no'
      },
      type: {
        type: DataTypes.ENUM('Open Truck', 'Dump Truck', 'Compactor', 'Container Carrier'),
        allowNull: false
      },
      capacity: {
        type: DataTypes.ENUM(3, 5, 7, 15),
        allowNull: false
      },
      fuelCostLoaded: {
        type: DataTypes.FLOAT,
        allowNull: false,
        field: 'fuel_cost_loaded'
      },
      fuelCostUnloaded: {
        type: DataTypes.FLOAT,
        allowNull: false,
        field: 'fuel_cost_unloaded'
      }

  },
  {
      timestamps: false // Disable automatic timestamp tracking
  }
);

module.exports = VehicleModel;
