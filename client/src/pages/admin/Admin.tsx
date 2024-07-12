import React from "react";
import UserManagement from "./User";
import GroupManagement from "./Group";
import PostManagement from "./Post";
import "./Admin.scss";

const Admin: React.FC = () => {
  return (
    <div className="admin-panel">
      <header className="admin-header">Admin Panel</header>
      <div className="admin-container">
        <aside className="admin-sidebar">
          <ul>
            <li>Quản lý User</li>
            <li>Quản lý Group</li>
            <li>Quản lý Bài viết</li>
          </ul>
        </aside>
        <main className="admin-content">
          <UserManagement />
          <GroupManagement />
          <PostManagement />
        </main>
      </div>
    </div>
  );
};

export default Admin;
