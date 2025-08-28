// 들어오는 모든 요청의 URL, HTTP 메서드, 요청 시간 등을 기록합니다.
// 디버깅이나 시스템 모니터링에 유용합니다.
// src/middlewares/log.middleware.js

const requestLogger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
    next(); // 다음 미들웨어로 제어권 넘기기
};

module.exports = requestLogger;