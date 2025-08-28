// 상품 관련 요청 처리
// src/controllers/product.controller.js
const productService = require('./product.service');

// Get all products
exports.getProducts = async (req, res) => {
    try {
        const products = await productService.findAll();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await productService.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found.' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new product
exports.createProduct = async (req, res) => {
    try {
        const newProduct = await productService.create(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an existing product
exports.updateProduct = async (req, res) => {
    try {
        const updatedProduct = await productService.update(req.params.id, req.body);
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found.' });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};