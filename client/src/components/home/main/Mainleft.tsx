import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store/store";
import {
  setGroups,
  addGroup,
  updateGroup,
  deleteGroup,
} from "../../../store/reducers/groupReducer";
import {
  setFriends,
  addFriend,
  editFriend,
  deleteFriend,
} from "../../../store/reducers/friendReducer";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import api from "../../../api/index";
import "../Home.scss";
import { Group, Friend } from "../../../interface";

const MainLeft: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingGroupId, setEditingGroupId] = useState<number | null>(null);
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupImage, setNewGroupImage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const groupList = useSelector((state: RootState) => state.groups.groups);
  const friends = useSelector((state: RootState) => state.friends.friends);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await api.get("/groups");
      dispatch(setGroups(response.data));
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  const handleShowModal = (isEdit: boolean, groupId?: number) => {
    setIsEditing(isEdit);
    if (isEdit && groupId !== undefined) {
      const group = groupList.find((g) => g.id === groupId);
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

  const handleCreateOrEditGroup = async () => {
    if (!newGroupName.trim() || !newGroupImage.trim()) {
      setErrorMessage("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    try {
      if (isEditing && editingGroupId !== null) {
        const editGroup = {
          id: editingGroupId,
          name: newGroupName,
          group_picture: newGroupImage,
        };
        await api.put(`/groups/${editingGroupId}`, editGroup);
        dispatch(updateGroup(editGroup));
      } else {
        const newGroup = {
          name: newGroupName,
          group_picture: newGroupImage,
        };
        const response = await api.post("/groups", newGroup);
        dispatch(addGroup(response.data));
      }
      handleCloseModal();
    } catch (error) {
      console.error("Error creating or updating group:", error);
    }
  };

  const handleDeleteGroup = async (groupId: number) => {
    try {
      await api.delete(`/groups/${groupId}`);
      dispatch(deleteGroup(groupId));
    } catch (error) {
      console.error("Error deleting group:", error);
    }
  };

  const handleDeleteFriend = async (friendId: number) => {
    try {
      await api.delete(`/friends/${friendId}`);
      dispatch(deleteFriend(friendId));
    } catch (error) {
      console.error("Error deleting friend:", error);
    }
  };

  return (
    <div className="main-left">
      <div className="group-chats">
        <div className="d-flex justify-content-between">
          <h6>Nhóm của bạn</h6>
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
        {groupList.map((group: Group) => (
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
        {friends.map((friend: Friend) => (
          <div key={friend.id} className="contact">
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
                <Dropdown.Item onClick={() => handleShowModal(true, friend.id)}>
                  Sửa
                </Dropdown.Item>
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
