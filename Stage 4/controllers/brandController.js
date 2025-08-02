const brandModel = require("../schema/brand");
const productModel = require("../schema/product");

const addBrand = async (req, res) => {
  const { brandName } = req.body;

  // const brandNameNoCase = new RegExp(brandName, "i");

  const brandExists = await brandModel.findOne({
    brandName: new RegExp(brandName, "i"),
  });
  if (brandExists) {
    return res.status(400).send({ message: "Brand already exists" });
  }
  try {
    const newBrand = await brandModel.create({
      brandName: brandName.toLocaleLowerCase(),
    });
    res
      .status(200)
      .send({ message: `${newBrand.brandName} Brand successfully added` });
  } catch (error) {
    res.status(500).send({ message: "failed to add brand" });
  }
};

const updateBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const brandExists = await brandModel.findByIdAndUpdate(id, updateData);
    res.status(200).send({ message: "success", data: brandExists });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const getAllBrands = async (req, res) => {
  try {
    const allBrands = await brandModel.find();

    if (allBrands.length < 1) {
      return res.send({ message: "No brands found" });
    }
    res.status(200).send({ message: "success", data: allBrands });
    return;
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const brandToDelete = await brandModel.findById(id);

    if (!brandToDelete) {
      return res.status(400).send({
        message: "brand not found",
      });
    }

    const deleteProducts = await productModel.deleteMany({ brand: id });
    const deleteBrand = await brandModel.findByIdAndDelete(id);
    console.log(deleteBrand);

    return res.status(200).send({
      message: `${deleteBrand.brandName} and ${deleteProducts.deletedCount} products under the brand deleted`,
      data: brandToDelete,
    });
  } catch (error) {
    return res.send({ message: error.message });
  }
};
module.exports = { addBrand, getAllBrands, deleteBrand, updateBrand };
