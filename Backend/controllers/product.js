const product = require("../models/product");
const Product = require("../models/product");

const allProducts = async (res, req) => {
    const productFilter = await Product.find();
  const products = await Product.find();
  res.status(200).json(products);
};




const detailProducts = async (res, req) => {
  const products = await Product.findById(req.params.id);
  res.status(200).json(products);
};

const createProducts = async (res, req) => {
  const products = await Product.create(req.body);
  res.status(201).json(products);
};

const deleteProducts = async (res, req) => {
  const products = await Product.findById(req.params.id);

  product.removeAllListeners();

  res.status(200).json({
    message: "Ürün Başarıyla silindi...",
  });
};

const updateProducts = async (res, req) => {
  const products = await Product.findById(req.params.id);

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json({
    product,
  });
};

module.exports = {
  allProducts,
  detailProducts,
  createProducts,
  deleteProducts,
  updateProducts,
};
