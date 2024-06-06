// ChatBotChatModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/sequalizeConfig'); // Assuming your Sequelize instance is defined in a separate file
const ChatBotModel = require('./ChatBotModel');

const ChatBotChatModel = sequelize.define('chatbotchats', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    chatId: {
      type: DataTypes.INTEGER,
      field: 'chat_id',
      allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    text: {
        type: DataTypes.STRING,
        // field: 'message',
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
        allowNull: false
    }
  },
  {
      timestamps: false // Disable automatic timestamp tracking
  }
);

ChatBotChatModel.belongsTo(ChatBotModel, { foreignKey: 'chatId' });
module.exports = ChatBotChatModel;
