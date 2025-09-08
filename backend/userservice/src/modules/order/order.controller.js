// 주문 관련 요청 처리
// src/controllers/order.controller.js
const orderService = require('./order.service');

// Create a new order
exports.createOrder = async (req, res) => {
    try {
        const newOrder = await orderService.create(req.body);
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all orders for a specific user
exports.getOrdersByUser = async (req, res) => {
    try {
        const orders = await orderService.findByUserId(req.params.userId);
        if (orders.length === 0) {
            return res.status(404).json({ message: 'No orders found for this user.' });
        }
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single order by ID
exports.getOrderById = async (req, res) => {
    try {
        const order = await orderService.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found.' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};