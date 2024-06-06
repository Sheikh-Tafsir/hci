const express = require("express");
const router = express.Router();
const chatBotController = require("../controller/ChatBotController");

// get chats by user id
router.get("/chatlist/:id", chatBotController.getChatsById);

//create new chatbot
router.post("/chatlist/create", chatBotController.createChatBot);

//update chatbot by chat id
router.put("/chatlist/update/:id", chatBotController.updateChatBot);

//get message
router.get("/messages/:id", chatBotController.getMessagesByChatId);

//save message
router.post("/messages/create", chatBotController.saveMessage);

module.exports = router;
