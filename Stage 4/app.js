const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");

const userRouter = require("./routers/userRouter");
const productsRouter = require("./routers/productsRouter");
const brandsRouter = require("./routers/brandsRouter");

const app = express();
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

// user
app.use("/auth", userRouter);
app.use("/products", productsRouter);
app.use("/brands", brandsRouter);

// get all products

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
