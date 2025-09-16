// src/api/user.js

/**
 * 모든 사용자 목록을 가져옵니다.
 * @returns {Promise<Array>} 사용자 배열
 */
export const fetchAllUsers = async () => {
  try {
    const response = await fetch('/api/com/users'); // Nginx 프록시를 통해 백엔드 `mbe-sbcom`으로 요청
    if (!response.ok) {
      throw new Error('사용자 목록을 불러오는 데 실패했습니다.');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API 호출 에러:', error);
    throw error;
  }
};