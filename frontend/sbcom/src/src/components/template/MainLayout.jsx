import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import './../../styles/template/MainLayout.css';

const MainLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="main-layout">
      <Header toggleSidebar={toggleSidebar} />
      <div className="content-area">
        <Sidebar isOpen={isSidebarOpen} />
        <main className={`main-content ${isSidebarOpen ? '' : 'full-width'}`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;