// Write an e-commerce app that has the following endpoint

// a. "/auth/register" POST endpoint that accepts full name, email, password and role. Role can be either "admin" or "customer".
// b. "/auth/login" POST endpoint that allows the user to login. Note: Your JWT should have userId, email and role.
// c. "/products" GET endpoint to get list of products.

// d. "/products" POST endpoint add a product. The product should have a "productName", "ownerId", "cost", "productImages" (array of image links), "description" and "stockStatus". The ownerId will hold the ID of the admin that posted the product.
// e. "/products/:id" DELETE endpoint.
// Note: The product POST and product DELETE endpoints should only be accessible by the admin while the GET endpoint should be accessed by anybody.
// Also, use MongoDB to store and retrieve data.
// Submit your github repo link and your postman documentation link.

const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const joi = require("joi");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");

const userModel = require("./schema/user");
const productModel = require("./schema/product");

const app = express();
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("connected to the db");
  })
  .catch((err) => {
    console.log("An error occurred:", err);
  });

const PORT = process.env.PORT;

app.use(express.json());

// user registration
app.post("/auth/register", async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    // validate role
    const schema = joi.string().valid("admin", "customer");
    const { error } = schema.validate(role);
    if (error) {
      res.status(422).send({ message: error.message });
      return;
    }

    // check if email already exists
    const emailExists = await userModel.findOne({ email });
    if (emailExists) {
      res.status(400).send({ message: "email already exists" });
      return;
    }

    const hashedPwd = bcrypt.hashSync(password, 10);

    const newUser = await userModel.create({
      fullName,
      email,
      password: hashedPwd,
      role,
    });

    res
      .status(200)
      .send({ message: `New ${role} added successfully`, newUser });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Unable to create User" });
  }
});

// user login
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  const userDetail = await userModel.findOne({ email });

  if (!userDetail) {
    res
      .status(404)
      .send({ message: `No registered user with email: ${email}` });
    return;
  }

  const passwordCheck = bcrypt.compareSync(password, userDetail.password);

  if (!passwordCheck) {
    res.status(200).send({ message: "invalid credentials" });
  }

  const token = jsonwebtoken.sign(
    {
      userId: userDetail.id,
      email: userDetail.email,
      password: userDetail.role,
    },
    process.env.JWT_KEY
  );

  res.status(200).send({
    message: "Login successful",
    token,
    userDetail: {
      fullName: userDetail.fullName,
      role: userDetail.role,
    },
  });
});

// get all products
app.get("/products", async (req, res) => {
  try {
    const allProducts = await productModel.find();
    if (allProducts.length < 1) {
      res.send("No products available");
      return;
    }
    res.send(allProducts);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.post("/products", async (req, res) => {
  const { productName, cost, productImages, description, stockStatus } =
    req.body;

  const [scheme, token] = req.header.authorization.split(" ");
  if (scheme.toLocaleLowerCase() == "bearer") {
  }
});

// app.get("/", (req, res) => {
//   res.send("Server is running 🚀");
// });

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

// NODEMAILER IS USED TO SEND EMAILS FROM BACKEND
