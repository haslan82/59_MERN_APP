const product = require("../models/product");
const ProductFilter = require("../models/product");

const allProducts = async (req, res) => {
  const  resultPerPage=10;
    const productFilter = new ProductFilter(Product.find(), req.query).search().filter().pagination(resultPerPage)
  const products = await productFilter.query
  res.status(200).json({products});
};




const detailProducts = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.status(200).json({product});
};

const createProducts = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
};

const deleteProducts = async (req, res) => {
  const product = await Product.findById(req.params.id);

  product.removeAllListeners();

  res.status(200).json({
    message: "Ürün Başarıyla silindi...",
  });
};

const updateProducts = async (req, res) => {
  const product = await Product.findById(req.params.id);

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


/* const Product = require("../models/product");
const ProductFilter = require("../models/product");

const allProducts = async (req, res) => {
  const  resultPerPage=10;
  try {
    const productFilter = new ProductFilter(await Product.find(), req.query);
    res.status(200).json({ products: productFilter });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const detailProducts = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Ürün bulunamadı." });
    }
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProducts = async (req, res) => {
  try {
    if (!req.body.name || !req.body.price) {
      return res.status(400).json({ message: "Ürün adı ve fiyatı gerekli!" });
    }
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProducts = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Ürün bulunamadı." });
    }
    await product.remove();
    res.status(200).json({ message: "Ürün başarıyla silindi." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProducts = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Ürün bulunamadı." });
    }
    res.status(200).json({ product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  allProducts,
  detailProducts,
  createProducts,
  deleteProducts,
  updateProducts,
};
 */