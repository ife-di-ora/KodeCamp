const { populate } = require("dotenv");
const brandModel = require("../schema/brand");
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
const getBrandProducts = async (req, res) => {
  try {
    const { brand, page, limit } = req.params;

    // const brandNameNoCase = new RegExp(brand, "i");

    const brandExists = await brandModel.findOne({
      brandName: new RegExp(brand, "i"),
    });

    if (!brandExists) {
      return res.status(400).send({ message: "Brand not in our records yet" });
    }

    const allProducts = await productModel.paginate(
      { brand: brandExists._id },
      {
        page: parseInt(page),
        limit: parseInt(limit),
        populate: "brand",
      }
    );

    if (allProducts.length < 1) {
      res.send("No products under this brand");
      return;
    }
    res.status(200).send({ message: "success", data: allProducts });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// add new product

const addNewProduct = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).send({ message: "Only admins can add products" });
  }

  const { productName, cost, productImages, description, stockStatus, brand } =
    req.body;

  const brandExists = await brandModel.findOne({
    brandName: new RegExp(brand, "i"),
  });

  if (!brandExists) {
    res.status(400).send({ message: "Brand Does not exist" });
  }

  try {
    const newProduct = await productModel.create({
      productName,
      cost,
      productImages,
      description,
      stockStatus,
      ownerId: req.user.userId,
      brand: brandExists._id,
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

module.exports = {
  getAllProducts,
  addNewProduct,
  deleteProduct,
  getBrandProducts,
};
