import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
// import "./ProfilePage.css";

const ProfilePage = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="container mt-5">
      <div className="row" style={{ marginTop: "100px" }}>
        <div className="col-md-8">
          <div className="card">
            <div className="card-body text-center">
              <img
                src="https://via.placeholder.com/150"
                className="w-50 mb-3"
                alt="User"
              />
              <h4>Hoàng Nam</h4>
              <button className="btn btn-primary btn-sm mx-2">
                Thêm vào tin
              </button>
              <button
                className="btn btn-secondary btn-sm mx-2"
                onClick={handleShowModal}
              >
                Chỉnh sửa trang cá nhân
              </button>
              <button className="btn btn-secondary btn-sm mx-2">Bạn Bè</button>
            </div>
          </div>
          <div className="card mt-3">
            <div className="card-body">
              <h5 className="card-title">Những người bạn có thể biết</h5>
              <div className="d-flex flex-wrap">
                {[
                  "User 1",
                  "User 2",
                  "User 3",
                  "User 4",
                  "User 5",
                  "User 6",
                ].map((user, index) => (
                  <div className="p-2 text-center" key={index}>
                    <img
                      src="https://via.placeholder.com/100"
                      className="rounded"
                      alt={user}
                    />
                    <p>{user}</p>
                    <button className="btn btn-primary btn-sm">
                      Thêm bạn bè
                    </button>
                  </div>
                ))}
              </div>
              <a href="#" className="btn btn-link">
                Xem tất cả
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Giới thiệu</h5>
              <p className="card-text">Thông tin giới thiệu...</p>
              <button className="btn btn-secondary btn-sm">
                Chỉnh sửa chi tiết
              </button>
              <button className="btn btn-secondary btn-sm">
                Thêm nội dung đáng chú ý
              </button>
            </div>
          </div>
          <div className="card mt-3">
            <div className="card-body">
              <h5 className="card-title">Ảnh</h5>
              <div className="d-flex flex-wrap photos-grid">
                {Array(6)
                  .fill()
                  .map((_, index) => (
                    <img
                      src="https://via.placeholder.com/100"
                      alt={`Photo ${index}`}
                      key={index}
                    />
                  ))}
              </div>
              <a href="#" className="btn btn-link">
                Xem tất cả ảnh
              </a>
            </div>
          </div>
          <div className="card mt-3">
            <div className="card-body">
              <h5 className="card-title">Bạn bè</h5>
              <div className="d-flex flex-wrap">
                {[
                  "Friend 1",
                  "Friend 2",
                  "Friend 3",
                  "Friend 4",
                  "Friend 5",
                  "Friend 6",
                ].map((friend, index) => (
                  <div className="p-2 text-center" key={index}>
                    <img
                      src="https://via.placeholder.com/100"
                      className="rounded"
                      alt={friend}
                    />
                    <p>{friend}</p>
                  </div>
                ))}
              </div>
              <a href="#" className="btn btn-link">
                Xem tất cả bạn bè
              </a>
            </div>
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa trang cá nhân</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Họ và tên</Form.Label>
              <Form.Control type="text" placeholder="Nhập họ và tên" />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Nhập email" />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control type="password" placeholder="Nhập mật khẩu" />
            </Form.Group>
            <Form.Group controlId="formImage">
              <Form.Label>Ảnh đại diện</Form.Label>
              <Form.Control type="text" placeholder="URL ảnh đại diện" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Lưu thay đổi
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProfilePage;
