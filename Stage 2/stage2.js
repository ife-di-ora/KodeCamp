

// Note: For question 2, don’t worry about adding the shop name and shop location to question 2. Submit a github repository link for question 2.
const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory products array
let products = [];

// Helper: Generate random ID
function generateId() {
  return Math.random();
}

// Valid stock statuses
const validStatuses = ["in-stock", "low-stock", "out-of-stock"];

// GET /products - Get all products
app.get("/products", (req, res) => {
  res.json(products);
});

// GET /products/:id - Get product by ID
app.get("/products/:id", (req, res) => {
  const product = products.find((p) => p.id == req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
});

// POST /products - Add a new product
app.post("/products", (req, res) => {
  const { productName, cost, stockStatus } = req.body;

  if (!validStatuses.includes(stockStatus)) {
    return res.status(400).json({ message: "Invalid stock status" });
  }

  const newProduct = {
    id: generateId(),
    productName,
    cost,
    stockStatus,
    createdAt: new Date(),
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PATCH /products/:id - Edit product (except stockStatus)
app.patch("/products/:id", (req, res) => {
  const { productName, cost } = req.body;
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ message: "Product not found" });

  if (productName !== undefined) product.productName = productName;
  if (cost !== undefined) product.cost = cost;

  res.json(product);
});

// PATCH /products/:id/:status - Change stock status only
app.patch("/products/:id/:status", (req, res) => {
  const { id, status } = req.params;
  const product = products.find((p) => p.id == id);
  if (!product) return res.status(404).json({ message: "Product not found" });

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid stock status" });
  }

  product.stockStatus = status;
  res.json(product);
});

// DELETE /products/:id - Delete product by ID
app.delete("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex((p) => p.id === id);
  if (index === -1)
    return res.status(404).json({ message: "Product not found" });

  const deleted = products.splice(index, 1);
  res.json({ message: "Product deleted", product: deleted[0] });
});

