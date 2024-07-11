import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";
import "../Home.scss";
import baseUrl from "../../../api";

const MainLeft: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingGroupId, setEditingGroupId] = useState<number | null>(null);
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupImage, setNewGroupImage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState<any>(null);
  const [friends, setFriends] = useState<any[]>([]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await baseUrl.get(`/User`);
      const users = response.data;
      const currentUser = users[0]; // Giả sử người dùng hiện tại là người dùng đầu tiên
      setUser(currentUser);
      fetchFriends(currentUser.friends);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchFriends = async (friendsList: any[]) => {
    try {
      const friendPromises = friendsList.map((friend) =>
        baseUrl.get(`/User/${friend.userId}`)
      );
      const friendResponses = await Promise.all(friendPromises);
      setFriends(friendResponses.map((response) => response.data));
    } catch (error) {
      console.error("Error fetching friends data:", error);
    }
  };

  const handleShowModal = (isEdit: boolean, groupId?: number) => {
    setIsEditing(isEdit);
    if (isEdit && groupId !== undefined) {
      const group = user.groups.find((g: any) => g.id === groupId);
      if (group) {
        setEditingGroupId(groupId);
        setNewGroupName(group.name);
        setNewGroupImage(group.group_picture);
      }
    } else {
      setNewGroupName("");
      setNewGroupImage("");
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewGroupName("");
    setNewGroupImage("");
    setErrorMessage("");
    setEditingGroupId(null);
  };

  const handleCreateOrEditGroup = () => {
    if (!newGroupName.trim() || !newGroupImage.trim()) {
      setErrorMessage("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    handleCloseModal();
    if (isEditing) {
      // Xử lý cập nhật nhóm ở đây
      console.log("Updated group with id:", editingGroupId);
    } else {
      // Xử lý tạo nhóm mới ở đây
      console.log("Created new group:", newGroupName);
    }
  };

  const handleDeleteGroup = (groupId: number) => {
    console.log("Deleted group with id:", groupId);
  };

  const handleDeleteFriend = (friendId: number) => {
    console.log("Deleted friend with id:", friendId);
  };

  const handleSelectFriend = (friendId: number, friendName: string) => {
    localStorage.setItem("selectedFriendId", friendId.toString());
    localStorage.setItem("selectedFriendName", friendName);
    console.log("Selected friend with id:", friendId);
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="main-left">
      <div className="group-chats">
        <div className="d-flex justify-content-between">
          <h6>Nhóm của bạn</h6>
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
        {user.groups.map((group: any) => (
          <div key={group.id} className="group-chat">
            <img
              src={group.group_picture}
              alt={group.name}
              className="group-img"
            />
            {group.name}
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                ...
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleShowModal(true, group.id)}>
                  Sửa
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleDeleteGroup(group.id)}>
                  Xóa
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        ))}
        <div
          className="group-chat create-group"
          onClick={() => handleShowModal(false)}
        >
          <span className="material-symbols-outlined">group_add</span>
          Tạo nhóm mới
        </div>
      </div>
      <div className="contacts">
        <div className="d-flex justify-content-between">
          <h6>Người liên hệ</h6>
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
        {friends.map((friend: any) => (
          <div
            key={friend.id}
            className="contact"
            onClick={() => handleSelectFriend(friend.id, friend.username)}
          >
            <img
              src={friend.avatar}
              alt={friend.username}
              className="friend-img"
            />
            {friend.username}
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                ...
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleDeleteFriend(friend.id)}>
                  Xóa
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        ))}
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? "Sửa nhóm" : "Tạo nhóm mới"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Tên nhóm</Form.Label>
              <Form.Control
                type="text"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                placeholder="Nhập tên nhóm"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Hình ảnh nhóm</Form.Label>
              <Form.Control
                type="text"
                value={newGroupImage}
                onChange={(e) => setNewGroupImage(e.target.value)}
                placeholder="Nhập URL hình ảnh nhóm"
              />
            </Form.Group>
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleCreateOrEditGroup}>
            {isEditing ? "Lưu thay đổi" : "Tạo nhóm"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MainLeft;
