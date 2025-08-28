// src/routes/user.route.js
const express = require('express');
const router = express.Router();

// 컨트롤러와 미들웨어 불러오기
const userController = require('./user.controller');
const verifyToken = require('../../middlewares/auth.middleware');
const validateUser = require('../../middlewares/validation.middleware');

// 라우트 정의
// GET /users: 모든 사용자 조회 (인증 불필요)
router.get('/', userController.getUsers);

// GET /users/:id: 특정 사용자 조회 (인증 불필요)
router.get('/:id', userController.getUserById);

// POST /users: 사용자 생성 (유효성 검사 미들웨어 적용)
router.post('/', validateUser, userController.createUser);

// PUT /users/:id: 사용자 업데이트 (인증 미들웨어 적용)
router.put('/:id', verifyToken, userController.updateUser);

// DELETE /users/:id: 사용자 삭제 (인증 미들웨어 적용)
router.delete('/:id', verifyToken, userController.deleteUser);

module.exports = router;