import React, { useEffect, useState } from "react";
import { Table, Button, Pagination } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { searchGroups, updateGroupStatus } from "../../services/admin/Group";
import { Group } from "../../interface/index";
import "./Admin.scss";

const GroupManagement: React.FC = () => {
  const dispatch = useDispatch();

  // Sửa thuộc tính từ 'groups' thành 'group'
  const groups = useSelector((state: RootState) => state.group.groups);
  const groupStatus = useSelector((state: RootState) => state.group.isLoading);
  const groupError = useSelector((state: RootState) => state.group.error);
  const groupTotalCount = useSelector(
    (state: RootState) => state.group.totalCount
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const groupsPerPage = 10;

  useEffect(() => {
    dispatch(searchGroups({ searchTerm, page, limit: groupsPerPage }));
  }, [dispatch, searchTerm, page]);

  const handleSearch = () => {
    dispatch(searchGroups({ searchTerm, page: 1, limit: groupsPerPage }));
  };

  const handleToggleGroupStatus = (groupId: number, currentStatus: boolean) => {
    dispatch(updateGroupStatus({ groupId, status: !currentStatus }));
  };

  const handlePageChange = (page: number) => {
    setPage(page);
    dispatch(searchGroups({ searchTerm, page, limit: groupsPerPage }));
  };

  const pagination = () => {
    const pages = Math.ceil(groupTotalCount / groupsPerPage);
    let items = [];
    for (let number = 1; number <= pages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === page}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    return items;
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search groups..."
      />
      <Button onClick={handleSearch}>Search</Button>
      {groupStatus === "loading" && <p>Loading...</p>}
      {groupError && <p>{groupError}</p>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Bio</th>
            <th>Status</th>
            <th>Actions</th>
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
      <Pagination>{pagination()}</Pagination>
    </div>
  );
};

export default GroupManagement;
