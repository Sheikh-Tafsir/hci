const ChatBotModel = require("../model/ChatBotModel");
const ChatBotChatModel = require("../model/ChatBotChatModel");

const getChatsById = async( userId ) =>{
    try{
        const chatBots = await ChatBotModel.findAll({
            where: {
                userId: userId
            },
        });

        const sortedChatBots = chatBots.sort((a, b) => b.id - a.id);
        return {
            message: "chat list found",
            chatlist: sortedChatBots
        };
    } catch (error) {
        console.error("Error getting messages by chat id:", error.message);
        //throw new Error("Internal server error");
        return {
            message: error.message,
        };
    }
};

//create new chat
const createChatBot = async (userId) => {
    try {
        // Create the user
        const chatBot = await ChatBotModel.create({
            name:'new chat',
            userId: userId,
        });

        return {
            message: "new chat created",
            chats: chatBot,
        };
    } catch (error) {
        console.error("Error creating chat:", error.message);
        //throw new Error("Internal server error");
        return {
            message: error.message,
        };
    }
};


//update new chat
const updateChatBot = async (chatId, name) => {
    try {
        // Create the user
        const chatBot = await ChatBotModel.update({
            name: name,
        },
        { where: { id: chatId }, returning: true }
        );

        return {
            message: "chat name updated",
        };
    } catch (error) {
        console.error("Error updaing chat:", error.message);
        //throw new Error("Internal server error");
        return {
            message: error.message,
        };
    }
};


//get messages by chat id
const getMessagesByChatId = async( chatId ) =>{
    try{
        const chats = await ChatBotChatModel.findAll({
            where: {
                chatId: chatId
            },
        });
        return {
            message: "messages found",
            chats:chats
        };
    } catch (error) {
        console.error("Error getting messages by chat id:", error.message);
        //throw new Error("Internal server error");
        return {
            message: error.message,
        };
    }
};

//save message
const saveMessage = async (chatId, role, text) => {
    try {
        // Create the user
        const newMessage = await ChatBotChatModel.create({
            chatId: chatId,
            role: role,
            text: text,
            createdAt: new Date(),
        });

        return {
            message: "message sent",
        };
    } catch (error) {
        console.error("Error during signup:", error.message);
        //throw new Error("Internal server error");
        return {
            message: error.message,
        };
    }
};

module.exports = {
    getChatsById,
    createChatBot,
    updateChatBot,
    getMessagesByChatId,
    saveMessage,
}