import React, { useEffect, useState } from "react";
import { Table, Button, Pagination } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { searchUsers, updateUserStatus } from "../../services/admin/User";
import { searchGroups, updateGroupStatus } from "../../services/admin/Group";
import { User, Group } from "../../interface/index";
import "./Admin.scss";

const Admin: React.FC = () => {
  const dispatch = useDispatch();

  // User state
  const users = useSelector((state: RootState) => state.user.searchResults);
  const userStatus = useSelector((state: RootState) => state.user.status);
  const userError = useSelector((state: RootState) => state.user.error);
  const userTotalCount = useSelector(
    (state: RootState) => state.user.totalCount
  ); // Total user count from state

  // Group state
  const groups = useSelector((state: RootState) => state.groups.groups);
  const groupStatus = useSelector((state: RootState) => state.groups.isLoading);
  const groupError = useSelector((state: RootState) => state.groups.error);
  const groupTotalCount = useSelector(
    (state: RootState) => state.groups.totalCount
  ); // Total group count from state

  const [userSearchTerm, setUserSearchTerm] = useState("");
  const [groupSearchTerm, setGroupSearchTerm] = useState("");

  // Pagination states
  const [userPage, setUserPage] = useState(1);
  const [groupPage, setGroupPage] = useState(1);
  const usersPerPage = 10;
  const groupsPerPage = 10;

  // Fetch users and groups on component mount
  useEffect(() => {
    dispatch(
      searchUsers({ searchTerm: "", page: userPage, limit: usersPerPage })
    );
    dispatch(
      searchGroups({ searchTerm: "", page: groupPage, limit: groupsPerPage })
    );
  }, [dispatch, userPage, groupPage]);

  const handleUserSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserSearchTerm(e.target.value);
    dispatch(
      searchUsers({ searchTerm: e.target.value, page: 1, limit: usersPerPage })
    );
  };

  const handleGroupSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroupSearchTerm(e.target.value);
    dispatch(
      searchGroups({
        searchTerm: e.target.value,
        page: 1,
        limit: groupsPerPage,
      })
    );
  };

  const handleToggleUserStatus = (userId: number, currentStatus: boolean) => {
    dispatch(updateUserStatus({ userId, status: !currentStatus }));
  };

  const handleToggleGroupStatus = (groupId: number, currentStatus: boolean) => {
    dispatch(updateGroupStatus({ groupId, status: !currentStatus }));
  };

  // Pagination handlers
  const handleUserPageChange = (page: number) => {
    setUserPage(page);
    dispatch(
      searchUsers({ searchTerm: userSearchTerm, page, limit: usersPerPage })
    );
  };

  const handleGroupPageChange = (page: number) => {
    setGroupPage(page);
    dispatch(
      searchGroups({ searchTerm: groupSearchTerm, page, limit: groupsPerPage })
    );
  };

  const userPagination = () => {
    const pages = Math.ceil(userTotalCount / usersPerPage);
    let items = [];
    for (let number = 1; number <= pages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === userPage}
          onClick={() => handleUserPageChange(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    return items;
  };

  const groupPagination = () => {
    const pages = Math.ceil(groupTotalCount / groupsPerPage);
    let items = [];
    for (let number = 1; number <= pages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === groupPage}
          onClick={() => handleGroupPageChange(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    return items;
  };

  return (
    <div className="admin-panel">
      <header className="admin-header">Admin Panel</header>
      <div className="admin-container">
        <aside className="admin-sidebar">
          <ul>
            <li>Quản lý User</li>
            <li>Quản lý Group</li>
          </ul>
        </aside>
        <main className="admin-content">
          {/* User Management */}
          <div className="search-container">
            <h2>Quản lý User</h2>
            <input
              type="text"
              value={userSearchTerm}
              onChange={handleUserSearch}
              placeholder="Tìm kiếm user..."
            />
            <Button
              onClick={() =>
                dispatch(
                  searchUsers({
                    searchTerm: userSearchTerm,
                    page: 1,
                    limit: usersPerPage,
                  })
                )
              }
            >
              Tìm kiếm
            </Button>
            {userStatus === "loading" && <p>Loading...</p>}
            {userError && <p>{userError}</p>}
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
                          onClick={() =>
                            handleToggleUserStatus(user.id, user.status)
                          }
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
            <Pagination>{userPagination()}</Pagination>

            {/* Group Management */}
            <h2>Quản lý Group</h2>
            <input
              type="text"
              value={groupSearchTerm}
              onChange={handleGroupSearch}
              placeholder="Tìm kiếm group..."
            />
            <Button
              onClick={() =>
                dispatch(
                  searchGroups({
                    searchTerm: groupSearchTerm,
                    page: 1,
                    limit: groupsPerPage,
                  })
                )
              }
            >
              Tìm kiếm
            </Button>
            {groupStatus === "loading" && <p>Loading...</p>}
            {groupError && <p>{groupError}</p>}
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Bio</th>
                  <th>Trạng thái</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {groups.length > 0 ? (
                  groups.map((group: Group) => (
                    <tr key={group.id}>
                      <td>{group.id}</td>
                      <td>{group.name}</td>
                      <td>{group.bio}</td>
                      <td>{group.status ? "Locked" : "Active"}</td>
                      <td>
                        <Button
                          onClick={() =>
                            handleToggleGroupStatus(group.id, group.status)
                          }
                        >
                          {group.status ? "Unlock" : "Lock"}
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5}>No groups found</td>
                  </tr>
                )}
              </tbody>
            </Table>
            <Pagination>{groupPagination()}</Pagination>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Admin;
