import React from 'react';
import './../../styles/template/Sidebar.css';

const Sidebar = ({ isOpen }) => {
  // 실제 메뉴 데이터는 API 호출을 통해 받아옵니다.
  // 이 예시에서는 더미 데이터를 사용합니다.
  const menuList = [
    { id: '1', name: 'Dashboard' },
    { id: '2', name: 'User Management' },
    { id: '3', name: 'Notice Board' },
  ];

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <nav>
        <ul>
          {menuList.map(menu => (
            <li key={menu.id}>
              <a href={`/${menu.name.toLowerCase().replace(' ', '-')}`}>
                {menu.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;