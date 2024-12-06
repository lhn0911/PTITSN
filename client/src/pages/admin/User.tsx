import React, { useEffect, useState } from "react";
import { Table, Button, Pagination } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { searchUsers, updateUserStatus } from "../../services/admin/User";
import { User } from "../../interface/index";

const UserManagement: React.FC = () => {
  const dispatch = useDispatch();

  const users = useSelector((state: RootState) => state.user.searchResults);
  const userStatus = useSelector((state: RootState) => state.user.status);
  const userError = useSelector((state: RootState) => state.user.error);
  const userTotalCount = useSelector(
    (state: RootState) => state.user.totalCount
  );

  const [userSearchTerm, setUserSearchTerm] = useState("");
  const [userPage, setUserPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    dispatch(
      searchUsers({
        searchTerm: userSearchTerm,
        page: userPage,
        limit: usersPerPage,
      })
    );
  }, [dispatch, userPage, userSearchTerm]);

  const handleUserSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserSearchTerm(e.target.value);
    dispatch(
      searchUsers({ searchTerm: e.target.value, page: 1, limit: usersPerPage })
    );
  };

  const handleToggleUserStatus = (userId: number, currentStatus: boolean) => {
    dispatch(updateUserStatus({ userId, status: !currentStatus }));
  };

  const handleUserPageChange = (page: number) => {
    setUserPage(page);
    dispatch(
      searchUsers({ searchTerm: userSearchTerm, page, limit: usersPerPage })
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

  return (
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
                    onClick={() => handleToggleUserStatus(user.id, user.status)}
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
    </div>
  );
};

export default UserManagement;
