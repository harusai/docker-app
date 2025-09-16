import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 임포트
import { login } from '../../api/auth';

import './../../styles/login/LoginScreen.css';

const LoginScreen = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(null);
  const navigate = useNavigate(); // useNavigate 훅 초기화


  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('로그인 시도:', { userId, password });
    // 여기에 실제 로그인 API 호출 로직을 구현합니다.


    // 로그인 성공 시, App 컴포넌트의 상태를 변경하여 MainLayout을 렌더링하도록 합니다. 
    try {
      const token = await login({ USER_ID: username, password });
      localStorage.setItem('authToken', token); // 토큰 저장
      navigate('/sbcom/main'); // 로그인 성공 시 '/main' 경로로 이동
    } catch (e) {
      setError(e.message);
    }

  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="userId">User ID</label>
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-btn">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginScreen;