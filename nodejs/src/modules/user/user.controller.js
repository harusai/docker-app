// 사용자 관련 요청 처리
// src/controllers/user.controller.js
const userService = require('./user.service');

// Get all users
exports.getUsers = async (req, res) => {
    console.log('getUserr');
    try {
        const users = await userService.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await userService.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new user
exports.createUser = async (req, res) => {
    try {
        const newUser = await userService.create(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an existing user
exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await userService.update(req.params.id, req.body);
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a user
exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await userService.delete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json({ message: 'User successfully deleted.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};