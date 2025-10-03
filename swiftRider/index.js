const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const userRoutes = require("./routers/userRoutes");
const deliveryRoutes = require("./routers/deliveryRoutes");
const paystackRoutes = require("./routers/paystackRoutes");

app.use(express.json());

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Connected to swiftrider_db");
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("default page");
});

app.use("/user", userRoutes);
app.use("/del", deliveryRoutes);
app.use("/paystack", paystackRoutes);

app.listen(process.env.PORT, () => {
  console.log("server running on port ", process.env.PORT);
});
