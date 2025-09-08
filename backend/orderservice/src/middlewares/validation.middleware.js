//요청 본문(request body)이나 쿼리 파라미터의 데이터 형식이 유효한지 확인합니다.
//예를 들어, 사용자 회원가입 시 이메일 형식이 올바른지 검사합니다.

// src/middlewares/validation.middleware.js
const Joi = require('joi');

// 사용자 데이터 유효성 검사를 위한 Joi 스키마 정의
const userSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

const validateUser = (req, res, next) => {
    const { error } = userSchema.validate(req.body);

    if (error) {
        // 유효성 검사 실패 시, 첫 번째 에러 메시지를 반환
        return res.status(400).json({ message: error.details[0].message });
    }

    next(); // 유효성 검사 성공 시 다음으로 이동
};

module.exports = validateUser;