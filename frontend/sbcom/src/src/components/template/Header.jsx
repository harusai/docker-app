import React from 'react';
import './../../styles/template/Header.css';

const Header = ({ toggleSidebar }) => {
  // 실제 애플리케이션에서는 로그인 상태와 사용자 정보를 상태 관리(예: Redux, Context API)로 가져옵니다.
  const user = { name: 'Admin', role: 'System Administrator' };

  const handleLogout = () => {
    console.log('로그아웃 처리');
    // 여기에 실제 로그아웃 로직을 구현합니다.
  };

  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-toggle-btn" onClick={toggleSidebar}>
          ☰
        </button>
        <img src="/vite.svg" alt="Logo" className="logo" />
      </div>
      <div className="header-right">
        <span className="user-info">
          Hello, {user.name} ({user.role})
        </span>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;