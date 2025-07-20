const productModel = require("../schema/product");

const getAllProducts = async (req, res) => {
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
};

// add new product

const addNewProduct = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).send({ message: "Only admins can add products" });
  }

  const { productName, cost, productImages, description, stockStatus } =
    req.body;

  try {
    const newProduct = await productModel.create({
      productName,
      cost,
      productImages,
      description,
      stockStatus,
      ownerId: req.user.userId,
    });

    res.status(201).send({ message: "Product created", newProduct });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// admin delete product
const deleteProduct = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).send({ message: "Only admins can delete products" });
  }

  try {
    const deleted = await productModel.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).send({ message: "Product not found" });
    }

    res.send({ message: "Product deleted", deleted });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = { getAllProducts, addNewProduct, deleteProduct };
