// src/middlewares/error.middleware.js

const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // 서버 콘솔에 에러 스택 출력
    
    // 에러 상태 코드와 메시지 설정
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    // 클라이언트에게 JSON 형식으로 에러 응답
    res.status(statusCode).json({
        success: false,
        message: message,
    });
};

module.exports = errorHandler;