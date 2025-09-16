// src/pages/UserListPage.jsx

import React, { useState, useEffect } from 'react';
import UserList from '../../components/users/UserList';
import { fetchAllUsers } from '../../api/users/users';

function UserListPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchAllUsers(); // API 호출
        setUsers(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  if (loading) return <div>사용자 목록을 불러오는 중...</div>;
  if (error) return <div>에러: {error}</div>;

  return (
    <div>
      <h1>사용자 목록</h1>
      <UserList users={users} />
    </div>
  );
}

export default UserListPage;