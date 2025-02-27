import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Product from "../models/product.js";
import ErrorHandler from "../utils/errorHandler.js";


export const getProducts = catchAsyncErrors(async(req, res) => {
    const products = await Product.find();

    res.status(200).json({
        products,
    });
});

//Create new Product => /api/v1/admin/products
export const newProduct = catchAsyncErrors(async(req, res) => {
    const product = await Product.create(req.body);

    res.status(200).json({
        product
    });
});

//Get single product details = /api/v1/products/:id
export const getProductDetails = catchAsyncErrors(async(req, res, next) => {
    const products = await Product.findById(req.params.id);

    if (!products){
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
        products,
    });
});

//Update product details = /api/v1/products/:id
export const updateProduct = catchAsyncErrors(async(req, res) => {
    let products = await Product.findById(req.params.id);

    if (!products){
        return next(new ErrorHandler("Product not found", 404));
    };

    products = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    res.status(200).json({
        products,
    });
});

//Delete product = /api/v1/products/:id
export const deleteProduct = catchAsyncErrors(async(req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    await product.deleteOne(); // This will now only execute if product exists

    res.status(200).json({
        message: "Product Deleted",
    });
});