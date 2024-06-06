// ChatBotModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/sequalizeConfig'); // Assuming your Sequelize instance is defined in a separate file
const UserModel = require('../../user/model/UserModel');

const ChatBotModel = sequelize.define('chatbots', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        field: 'user_id',
        allowNull: false
    },
  },
  {
      timestamps: false // Disable automatic timestamp tracking
  }
);

ChatBotModel.belongsTo(UserModel, { foreignKey: 'userId' });
module.exports = ChatBotModel;
