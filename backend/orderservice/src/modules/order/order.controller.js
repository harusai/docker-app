// 사용자 관련 요청 처리
// src/controllers/user.controller.js
const orderService = require('./order.service');

// Get all users
exports.getOrders = async (req, res) => {
    try {
        const users = await orderService.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single user by ID
exports.getOrderById = async (req, res) => {
    try {
        const user = await orderService.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new user
exports.createOrder = async (req, res) => {
    try {
        const newUser = await orderService.create(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an existing user
exports.updateOrder = async (req, res) => {
    try {
        const updatedUser = await orderService.update(req.params.id, req.body);
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a user
exports.deleteOrder = async (req, res) => {
    try {
        const deletedUser = await orderService.delete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json({ message: 'User successfully deleted.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};