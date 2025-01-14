const product = require("../models/product");
const ProductFilter = require("../models/product");
const cloudinary = require('cloudinary').v2;



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

const createProducts = async (req, res,next) => {
  let images=[];
  if (typeof req.body.images ==="string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

let allImage=[];
  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.uploader.upload(images[i], {
      folder: "products",
    });
    allImage.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }
  req.body.images = allImage;



  const product = await Product.create(req.body);
  res.status(201).json(product);
};

const deleteProducts = async (req, res,next) => {
  const product = await Product.findById(req.params.id);

  for (let i = 0; i < product.images.length; i++) {
  await cloudinary.uploader.destroy(product.images[i].public_id);
    
  }

  await product.remove();

  res.status(200).json({
    message: "Ürün Başarıyla silindi...",
  });
};

const updateProducts = async (req, res,next) => {
  const product = await Product.findById(req.params.id);

  let images=[];
  if (typeof req.body.images ==="string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

if(images!==undefined){
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.uploader.destroy(product.images[i].public_id);
    
  }
}


let allImage=[];
  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.uploader.upload(images[i], {
      folder: "products",
    });
    allImage.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }
  req.body.images = allImage;

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,runValidators: true
  });

  res.status(200).json({
    product,
  });
};


const createReview =async (req, res,next) => {
  const {productId,comment, rating}=req.body;
   const review={
    user:req._id,
    name:req.name,
    comment,
    rating: Number(rating),
   }
const product = await Product.findById(productId);
product.reviews.push(review);
let avg=0;
product.reviews.forEach(rev=>{
  avg+=rev.rating;
})
product.rating=avg/product.reviews.length;
await product.save({validateBeforeSave:false});
res.status(200).json({
  success:true,
  message:"Yorumun başarıyla eklendi"
})
}


module.exports = {
  allProducts,
  detailProducts,
  createProducts,
  deleteProducts,
  updateProducts,
  createReview
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