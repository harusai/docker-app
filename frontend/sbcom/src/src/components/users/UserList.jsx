// src/components/UserList.jsx

import React from 'react';

function UserList({ users }) {
  if (!users || users.length === 0) {
    return <div>등록된 사용자가 없습니다.</div>;
  }

  return (
    <ul>
      {users.map((user) => (
        <li key={user.ID}>
          {user.USER_NM} ({user.USER_ID})
        </li>
      ))}
    </ul>
  );
}

export default UserList;