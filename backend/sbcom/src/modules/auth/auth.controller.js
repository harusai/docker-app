// src/modules/auth/auth.controller.js

const jwt = require('jsonwebtoken');
const { AuthService } = require('./auth.service');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const authService = new AuthService();

class AuthController {
    /**
     * 사용자 로그인 요청을 처리합니다.
     */
    async login(req, res, next) {
        try {
            const { USER_ID, password } = req.body;
            if (!USER_ID || !password) {
                return res.status(400).json({ message: '사용자 ID와 비밀번호를 입력해주세요.' });
            }
            
            const user = await authService.authenticateUser(USER_ID, password);

            if (!user) {
                return res.status(401).json({ message: '사용자 ID 또는 비밀번호가 잘못되었거나 계정이 잠겨 있습니다.' });
            }

            // JWT 토큰 생성
            const token = jwt.sign(
                { id: user.ID, userId: user.USER_ID }, // 토큰 페이로드
                JWT_SECRET,
                { expiresIn: '1h' } // 1시간 후 만료
            );

            res.status(200).json({
                message: '로그인 성공',
                token: token,
                user: {
                    id: user.ID,
                    userId: user.USER_ID,
                    userNm: user.USER_NM
                }
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = { AuthController };