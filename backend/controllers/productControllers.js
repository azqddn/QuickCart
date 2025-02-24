import Product from "../models/product.js";

export const getProducts = async(req, res) => {
    const products = await Product.find();

    res.status(200).json({
        products,
    });
};

//Create new Product => /api/v1/admin/products
export const newProduct = async(req, res) => {
    const product = await Product.create(req.body);

    res.status(200).json({
        product
    });
};

//Get single product details = /api/v1/products/:id
export const getProductDetails = async(req, res) => {
    const products = await Product.findById(req.params.id);

    if (!products){
        return res.status(404).json({
            error: "Product not found",
        })
    };

    res.status(200).json({
        products,
    });
};

//Update product details = /api/v1/products/:id
export const updateProduct = async(req, res) => {
    let products = await Product.findById(req.params.id);

    if (!products){
        res.status(404).json({
            error: "Product not found",
        })
    };

    products = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    res.status(200).json({
        products,
    });
};

//Delete product = /api/v1/products/:id
export const deleteProduct = async(req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(404).json({
            error: "Product not found",
        });
    }

    await product.deleteOne(); // This will now only execute if product exists

    res.status(200).json({
        message: "Product Deleted",
    });
};