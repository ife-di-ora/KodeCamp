const express = require("express");
const app = express();
const JsonWebToken = require("jsonwebtoken");

const { Server } = require("socket.io");
const { createServer } = require("http");

const server = createServer(app);

const io = new Server(server);

require("dotenv").config();
const mongoose = require("mongoose");

const userRouter = require("./routers/userRouter");
const productsRouter = require("./routers/productsRouter");
const brandsRouter = require("./routers/brandsRouter");
const orderRouter = require("./routers/orderRouter");

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("connected to the db");
  })
  .catch((err) => {
    console.log("An error occurred:", err);
  });

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use((req, res, next) => {
  req.socket = io;
  next();
});

io.use((socket, next) => {
  const auth = socket.handshake.headers.authorization;
  const [type, token] = auth.split(" ");
  if (type.toLocaleLowerCase() == "bearer") {
    const value = JsonWebToken.verify(token, process.env.JWT_KEY);
    socket.handshake.auth.decoded = value;
    next();
  } else {
    socket.send("Unatuhorized");
  }
});

// user
app.use("/auth", userRouter);
app.use("/products", productsRouter);
app.use("/brands", brandsRouter);
app.use("/order", orderRouter);
app.get("/", (req, res) => {
  res.send("Here we go");
});

// start server.io
io.on("connection", (socket) => {
  const decoded = socket.handshake.auth.decoded;
  socket.join(decoded.userId);

  socket.on("disconnect", () => {
    console.log("disconnected ", socket.id);
  });
});

server.listen(PORT, () => {
  console.log("now listening");
});
