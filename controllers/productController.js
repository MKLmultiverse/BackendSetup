const Product = require('../models/productModel');
const ApiFeatures = require('../utils/apifeatures');
const asynchandler = require('../utils/asynchandler');
const ErrorHandler = require('../utils/errorhandler');

//create Product--> Admin
exports.createProduct = asynchandler(async (req, res, next) => {
    req.body.userId = req.user.id;
    const product = await Product.create(req.body);
    res.status(200).json({
        success: true,
        product
    })
})

//Get all product 
exports.getAllProducts = asynchandler(async (req, res) => {
    const productPerPage = 1;
    const apiFeature = new ApiFeatures(Product.find(), req.query)
        .filter()
        .search()
        .pagenation(productPerPage)
    const products = await apiFeature.method;
    const productCount = await Product.countDocuments();
    res.status(200).json({
        success: true,
        products,
        productCount,
    })
})

//get single product / product details
exports.getProductDetails = asynchandler(async (req, res, next) => {
    const product = await Product.findById(req.params);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404))
    }
    res.status(200).json({
        success: true,
        product
    })
})

//Update Product --> Admin
exports.updateProduct = asynchandler(async (req, res, next) => {
    let product = await Product.findById(req.params._id);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404))
    }
    product = await Product.findByIdAndUpdate(req.params._id, req.body, { new: true, runValidators: true, useFindAndModify: false })
    res.status(200).json({
        success: true,
        product,
    })
})

//delete product --> admin
exports.deleteProduct = asynchandler(async (req, res, next) => {
    let product = await Product.findById(req.params._id);
    if (!product) {
        return next(ErrorHandler("Product not found", 404))
    }
    product = await Product.findByIdAndDelete(req.params._id);
    res.status(200).json({
        success: true,
        product
    })
})