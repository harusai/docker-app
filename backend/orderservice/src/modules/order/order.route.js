// src/routes/user.route.js
const express = require('express');
const router = express.Router();

// 컨트롤러와 미들웨어 불러오기
const orderController = require('./order.controller');
const verifyToken = require('../../middlewares/auth.middleware');
const validateUser = require('../../middlewares/validation.middleware');

// 라우트 정의
// GET /orders: 모든 구매 조회 (인증 불필요)
router.get('/', orderController.getOrders);

// GET /orders/:id: 특정 구매 조회 (인증 불필요)
router.get('/:id', orderController.getOrderById);

// POST /orders: 구매 생성 (유효성 검사 미들웨어 적용)
router.post('/', validateUser, orderController.createOrder);

// PUT /orders/:id: 구매 업데이트 (인증 미들웨어 적용)
router.put('/:id', verifyToken, orderController.updateOrder);

// DELETE /orders/:id: 구매 삭제 (인증 미들웨어 적용)
router.delete('/:id', verifyToken, orderController.deleteOrder);

module.exports = router;