
const express = require("express");
const {allProducts,detailProducts,createProducts,deleteProducts,updateProducts} = require("../controllers/product");

const router = express.Router();
router.get('/products',allProducts);
router.get('/products/:id',detailProducts);
router.post('/products/new',createProducts);
router.delete('/product/:id',deleteProducts);
router.put('/product/:id',updateProducts);

module.exports = router;