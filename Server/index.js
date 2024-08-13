import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import messageRoutes from './routes/messages.js';
import dotenv from 'dotenv';
import { Server as socket } from 'socket.io';
import bodyParser from 'body-parser';
const port = 5000;
const app=express();
// Load environment variables

dotenv.config();

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


mongoose.connect("mongodb+srv://madhu:madhu@cluster0.eea6dwq.mongodb.net/chat_app?retryWrites=true&w=majority&appName=Cluster0",
  {useNewUrlParser: true, useUnifiedTopology:true}
  ).then(()=>{
      console.log("connected to mongoDB");
  })
  .catch((err)=>{
      console.log(err.message);
  });
  

app.get("/ping", (_req, res) => {
  return res.json({ msg: "Ping Successful" });
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const server = app.listen(port, () =>
  console.log(`Server started on ${port}`)
);
const io = new socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});

