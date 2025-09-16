// src/api/auth.js

/**
 * 사용자 로그인 API를 호출합니다.
 * @param {object} credentials - { username, password }
 * @returns {Promise<string>} 로그인 성공 시 토큰을 반환
 */
export const login = async (credentials) => {
  try {
    // 실제 백엔드 로그인 엔드포인트로 교체해야 합니다.
    const response = await fetch('/api/com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('로그인에 실패했습니다.');
    }

    const data = await response.json();
    return data.token; // 토큰 반환
  } catch (error) {
    console.error('로그인 API 호출 에러:', error);
    throw error;
  }
};