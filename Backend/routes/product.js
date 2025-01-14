
const express = require("express");
const {allProducts,detailProducts,createProducts,deleteProducts,updateProducts,createReview,adminProducts} = require("../controllers/product");
const { authenticationMid, roleChecked } = require("../middleware/auth.js");//!  importunuda hata veriyor

const router = express.Router();


router.get('/products',allProducts);
router.get('/admin/products',authenticationMid,roleChecked('admin'),adminProducts);
router.get('/products/:id',detailProducts);
router.post('/products/new',authenticationMid,roleChecked('admin'),createProducts);
router.post('/products/newReview',authenticationMid,createReview);
router.delete('/product/:id',authenticationMid,roleChecked('admin'),deleteProducts);
router.put('/product/:id',authenticationMid,roleChecked('admin'),updateProducts);

module.exports = router;

