import reactLogo from './assets/react.svg'
import React, { Suspense, useState } from 'react';
import './App.css'
//import Button from 'remoteApp/Button';
// UserList 컴포넌트 import 추가
//import UserList from './src/services/Users/UserList';
import MainLayout from './src/components/template/MainLayout';
import LoginScreen from './src/components/login/LoginScreen';
import UserListPage from './src/pages/users/UserListPage';

// 리모트 컴포넌트를 동적으로 import
const Remote1Component = React.lazy(() => import('sbcef/Remote1Component'));
//const Remote2Component = React.lazy(() => import('remote2/Remote2Component'));
//const Remote3Component = React.lazy(() => import('remote3/Remote3Component'));


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리

  // 임시 로그인/로그아웃 함수
  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <>
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
  );
}


export default App
