// 인증 미들웨어 
// 사용자의 로그인 상태를 확인하거나 JWT(JSON Web Token)의 유효성을 검증합니다.
// 요청 헤더에 인증 정보가 있는지 확인하고, 없으면 오류를 반환합니다.

// src/middlewares/auth.middleware.js
const jwt = require('jsonwebtoken');

// 환경 변수로 SECRET_KEY를 설정하는 것을 권장합니다.
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; 

const verifyToken = (req, res, next) => {
    // 1. 요청 헤더에서 Authorization 값 추출
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header is missing.' });
    }

    const token = authHeader.split(' ')[1]; // 'Bearer TOKEN'에서 TOKEN만 추출
    if (!token) {
        return res.status(401).json({ message: 'Token is missing.' });
    }

    // 2. JWT 토큰 검증
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // 유효한 토큰일 경우, 유저 정보를 req 객체에 추가
        next(); // 다음 미들웨어 또는 라우터로 이동
    } catch (error) {
        return res.status(403).json({ message: 'Invalid or expired token.' });
    }
};

module.exports = verifyToken;