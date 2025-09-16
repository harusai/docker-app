// src/modules/auth/auth.route.js

const express = require('express');
const { AuthController } = require('./auth.controller');

const router = express.Router();
const authController = new AuthController();

// POST /auth/login: 사용자 로그인
router.post('/login', authController.login.bind(authController));

module.exports = router;