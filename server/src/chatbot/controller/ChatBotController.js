const ChatBotService = require('../service/ChatBotService');

//get chats
const getChatsById = async (req, res) => {
    //console.log(req.body);
      try {
        const userId = req.params.id;
        const chatBotService = await ChatBotService.getChatsById(userId);
        res.status(200).json(chatBotService);
      } catch (error) {
        console.error("Error getting chats by Id:", error.message);
        res.status(500).json({ error: error.message });
      }
};

//create chatbot
const createChatBot = async (req, res) => {
    //console.log(req.body);
  try {
    const { userId } = req.body;
    const chatBotService = await ChatBotService.createChatBot(userId);      
    res.status(201).json(chatBotService);

  } catch (error) {
    console.error("Error creating chatbot:", error.message);
    res.status(500).json({ error: error.message });
  }
};

//update chatbot
const updateChatBot = async (req, res) => {
  //console.log(req.body);
  try {
    const chatId = req.params.id;
    const { name } = req.body;
    const chatBotService = await ChatBotService.updateChatBot(chatId, name);      
    if(chatBotService.message == 'chat name updated')res.status(200).json(chatBotService);
    else res.status(500).json(chatBotService);

  } catch (error) {
    console.error("Error updating chatbot:", error.message);
    res.status(500).json({ error: error.message });
  }
};

//get messages
const getMessagesByChatId = async (req, res) => {
  //console.log(req.body);
    try {
      console.log(req.params);
      const chatId = req.params.id;
      console.log(chatId);
      const chatBotService = await ChatBotService.getMessagesByChatId(chatId);
      res.status(200).json(chatBotService);
    } catch (error) {
      console.error("Error getting messages by chat id:", error.message);
      res.status(500).json({ error: error.message });
    }
};

//save message
const saveMessage = async (req, res) => {
    console.log(req.body);
      try {
        const { chatId, role, text } = req.body;
        const chatBotService = await ChatBotService.saveMessage(chatId, role, text);      
        res.status(200).json(chatBotService);
    
      } catch (error) {
        console.error("Error saving message:", error.message);
        res.status(500).json({ error: error.message });
      }
};

module.exports = {
    getChatsById,
    createChatBot,
    updateChatBot,
    getMessagesByChatId,
    saveMessage,
}