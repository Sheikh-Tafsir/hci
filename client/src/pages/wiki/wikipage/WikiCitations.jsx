import React, { useEffect, useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GOOGLE_AI_API_KEY;

const WikiCitations = ({ page, onLinkClick }) => {
    const handleSendMessage = async () => {
        setPageLoading(true);
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const chat = model.startChat({
            history: chatHistory.map(message => ({
                role: message.role,
                parts: [{ text: message.text }] // Ensure each message has 'parts' property with an array of parts
            })),
            generationConfig: {
                maxOutputTokens: 100000,
            },
        });

        const msg = "write citations on " + page.title + " like wikipedia does. don't right anything unrelated";

        const result = await chat.sendMessage(msg);
        const response = await result.response;
        const responseText = await response.text();
        console.log(responseText)
        parseResponseText(responseText);

    };
  return (
    <div>
        
    </div>
  )
}

export default WikiCitations