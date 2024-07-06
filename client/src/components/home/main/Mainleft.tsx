import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import api from "../../../api/index";
import "../Home.scss";

export default function MainLeft({ groups, friends }: any) {
  const [showModal, setShowModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupImage, setNewGroupImage] = useState("");

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleCreateGroup = async () => {
    try {
      const newGroup = {
        name: newGroupName,
        image: newGroupImage,
      };
      await api.post("/groups", newGroup);
      // Optionally, update the state to reflect the new group without reloading
      // setGroups([...groups, newGroup]);
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
        {groups.map((group: any) => (
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
