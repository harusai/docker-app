// src/modules/auth/auth.service.js

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

class AuthService {
    /**
     * 사용자 인증을 수행하고, 성공 시 사용자 정보를 반환합니다.
     * @param {string} userId - 사용자 ID
     * @param {string} password - 사용자가 입력한 비밀번호
     * @returns {Promise<object | null>} 인증 성공 시 사용자 객체, 실패 시 null
     */
    async authenticateUser(userId, password) {
        try {
            // 1. 사용자 ID로 비밀번호 정보 조회
            const userPasswordData = await prisma.sBCOM_PASSWORD.findUnique({
                where: { USER_ID: userId }, // NOTE: schema.prisma에 정의된 고유키 필드에 따라 변경될 수 있습니다.
            });

            if (!userPasswordData) {
                console.log(`User not found for userId: ${userId}`);
                return null;
            }

            // 2. 계정 잠금 상태 확인
            if (userPasswordData.LOCK_YN === 'Y') {
                console.log(`Account is locked for userId: ${userId}`);
                return null;
            }

            // 3. 비밀번호 비교
            //const isMatch = await bcrypt.compare(password, userPasswordData.PASSWORD);
            const isMatch = (password === userPasswordData.PASSWORD); // 임시 로직, 실제로는 bcrypt.compare 사용

            if (!isMatch) {
                // TODO: 비밀번호 실패 횟수 증가 로직 추가
                return null;
            }

            // 4. 인증 성공 시 사용자 정보 반환
            // 비밀번호 실패 횟수 초기화 로직 추가
            // await prisma.sBCOM_PASSWORD.update({
            //     where: { USER_ID: userId },
            //     data: { PASSWORD_FAIL_CNT: 0 },
            // });

            return prisma.sBCOM_USER.findUnique({
                where: { USER_ID: userId },
            });
        } catch (error) {
            console.error('인증 서비스 에러:', error);
            throw new Error('인증 처리 중 오류가 발생했습니다.');
        }
    }
}

module.exports = { AuthService };