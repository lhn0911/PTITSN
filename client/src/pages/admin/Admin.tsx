import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { searchUsers, updateUserStatus } from "../../services/admin/User";
import { User } from "../../interface/index";
import "./Admin.scss";

const Admin: React.FC = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.user.searchResults);
  const status = useSelector((state: RootState) => state.user.status);
  const error = useSelector((state: RootState) => state.user.error);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(searchUsers(""));
  }, [dispatch]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    dispatch(searchUsers(e.target.value));
  };

  const handleToggleStatus = (userId: number, currentStatus: boolean) => {
    dispatch(updateUserStatus({ userId, status: !currentStatus }));
  };

  return (
    <div className="admin-panel">
      <header className="admin-header">Admin Panel</header>
      <div className="admin-container">
        <aside className="admin-sidebar">
          <ul>
            <li>Quản lý User</li>
          </ul>
        </aside>
        <main className="admin-content">
          <div className="search-container">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Tìm kiếm user..."
            />
            <Button onClick={() => dispatch(searchUsers(searchTerm))}>
              Tìm kiếm
            </Button>
          </div>
          {status === "loading" && <p>Loading...</p>}
          {error && <p>{error}</p>}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user: User) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.status ? "Locked" : "Active"}</td>
                    <td>
                      <Button
                        onClick={() => handleToggleStatus(user.id, user.status)}
                      >
                        {user.status ? "Unlock" : "Lock"}
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5}>No users found</td>
                </tr>
              )}
            </tbody>
          </Table>
        </main>
      </div>
    </div>
  );
};

export default Admin;
