import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import messageRoutes from './routes/messages.js';
import dotenv from 'dotenv';
import { Server as socket } from 'socket.io';
import bodyParser from 'body-parser';

dotenv.config();

const port = 5000;
const app = express();

// CORS configuration
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect("mongodb+srv://madhu:madhu@cluster0.eea6dwq.mongodb.net/chat_app?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to MongoDB");
}).catch(err => {
  console.log(err.message);
});

// Routes
app.get("/ping", (_req, res) => {
  return res.json({ msg: "Ping Successful" });
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Start server
const server = app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

// Socket.io configuration
const io = new socket(server, {
  cors: {
    origin: "https://chat-app-mern-frontend-jet.vercel.app",
    credentials: true
  }
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    global.onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = global.onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});
