import React, { useEffect, useState } from "react";
import baseURL from "../../api/index";

interface User {
  id: number;
  name: string;
  status: string;
}

const Admin: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    baseURL
      .get(`/User`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const handleLock = (userId: number) => {
    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, status: "inactive" } : user
    );
    setUsers(updatedUsers);
  };

  const handleUnlock = (userId: number) => {
    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, status: "active" } : user
    );
    setUsers(updatedUsers);
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      {users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} - {user.status}
              <button onClick={() => handleLock(user.id)}>Lock</button>
              <button onClick={() => handleUnlock(user.id)}>Unlock</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found</p>
      )}
    </div>
  );
};

export default Admin;
