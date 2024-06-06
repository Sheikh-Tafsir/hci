const express = require("express");
const app = express();
const cors = require("cors");
const http = require('http');
require("dotenv").config();

var corsOptions = {
  origin: process.env.CORS_ALLOWED_ORIGINS || "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Add the HTTP methods you need
  allowedHeaders: ["Content-Type", "Authorization"], // Add the headers you want to allow
};

// Then use corsOptions in your CORS middleware setup
app.use(cors(corsOptions));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use("/auth", require("./src/auth/route/AuthRoute"));
app.use("/users", require("./src/user/route/UserRoute"));
app.use("/profile", require("./src/profile/route/ProfileRoute"));
app.use("/rbac", require("./src/roles/route/RoleRoute"));
app.use("/vehicles", require("./src/vehicle/route/VehicleRoute"));
app.use("/sts", require("./src/sts/route/StsRoute"));
app.use("/chatbot", require("./src/chatbot/route/ChatBotRoute"));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
