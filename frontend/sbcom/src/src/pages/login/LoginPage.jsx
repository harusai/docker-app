import React, { Suspense, useState } from 'react';
import LoginScreen from '../../components/login/LoginScreen';
function LoginPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리

  // 임시 로그인/로그아웃 함수
  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
        <LoginScreen onLogin={handleLogin} />
  )
}   
export default LoginPage;
