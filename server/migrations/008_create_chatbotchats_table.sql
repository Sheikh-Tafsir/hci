CREATE TABLE chatbotchats (
    id SERIAL PRIMARY KEY,
    chat_id INT REFERENCES chatbots(id),
    role VARCHAR(50),
    text TEXT,
    created_at TIMESTAMP
);
