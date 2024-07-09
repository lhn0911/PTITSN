import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import api from "../../../api/index";
import "../Home.scss";

export default function MainLeft({ friends }: any) {
  const [showModal, setShowModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupImage, setNewGroupImage] = useState("");
  const [groupList, setGroupList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch groups from API when component mounts
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await api.get("/groups");
        setGroupList(response.data);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };
    fetchGroups();
  }, []);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setNewGroupName("");
    setNewGroupImage("");
    setErrorMessage("");
  };

  const handleCreateGroup = async () => {
    if (newGroupName.trim() === "" || newGroupImage.trim() === "") {
      setErrorMessage("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    try {
      const newGroup = {
        name: newGroupName,
        image: newGroupImage,
      };
      const response = await api.post("/groups", newGroup);
      // Update the group list with the newly created group
      setGroupList([...groupList, response.data]);
      handleCloseModal();
    } catch (error) {
      console.error("Error creating group:", error);
    }
  };

  return (
    <div className="main-left">
      <div className="group-chats">
        <div className="d-flex justify-content-between">
          <h6>Nhóm của bạn</h6>
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
        {groupList.map((group: any) => (
          <div key={group.id} className="group-chat">
            <img src={group.image} alt={group.name} className="group-img" />
            {group.name}
          </div>
        ))}
        <div className="group-chat create-group" onClick={handleShowModal}>
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
          <div key={friend.id} className="contact">
            <img src={friend.image} alt={friend.name} className="friend-img" />
            {friend.name}
          </div>
        ))}
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Tạo nhóm mới</Modal.Title>
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
          <Button variant="primary" onClick={handleCreateGroup}>
            Tạo nhóm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
