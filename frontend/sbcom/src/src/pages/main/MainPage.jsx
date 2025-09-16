//import React from 'react';

import React, { Suspense, useState } from 'react';
import MainLayout from '../../components/template/MainLayout';
import LoginScreen from '../../components/login/LoginScreen';
import UserListPage from '../../pages/users/UserListPage';

function MainPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리

  // 임시 로그인/로그아웃 함수
  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return  <>
      {isLoggedIn ? (
        <MainLayout>
          {/* MainLayout의 자식으로 메인 페이지 내용을 렌더링합니다. */}
          <h1>Host Application Main Page</h1>
          <Suspense fallback={<div>Loading Remote Components...</div>}>
            <Remote1Component />
          </Suspense>
        </MainLayout>
      ) : (
        <LoginScreen onLogin={handleLogin} />
      )}
      <UserListPage />
    </>
}   
export default MainPage;