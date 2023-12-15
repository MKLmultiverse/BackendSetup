const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require('../controllers/productController');
const  {isAuthenticatedUser, authorizedRoles}  = require('../middleware/auth');
const router = express.Router();

router.get("/products", getAllProducts);
router.get('/product/:_id', getProductDetails)
router.post('/product/new',isAuthenticatedUser,authorizedRoles("admin"), createProduct)
router.put('/product/:_id',isAuthenticatedUser,authorizedRoles("admin"), updateProduct)
router.delete('/product/:_id',isAuthenticatedUser,authorizedRoles("admin"), deleteProduct)

module.exports = router;