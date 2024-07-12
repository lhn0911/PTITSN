import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import baseUrl from "../../api"; // Import baseUrl from your api module

const ProfilePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null); // Initialize loggedInUser as null
  const [usersData, setUsersData] = useState([]); // State to store fetched user data

  useEffect(() => {
    // Fetch user data when the component mounts
    const fetchUserData = async () => {
      try {
        const response = await baseUrl.get("/User");
        setUsersData(response.data); // Store fetched user data in state
        // Assuming response.data is an array of users, set the first user as loggedInUser
        if (response.data.length > 0) {
          setLoggedInUser(response.data[0]);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData(); // Call the fetchUserData function
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleFriendRequest = async (userId) => {
    try {
      // Example of updating friend request (not implemented in JSON directly)
      // const updatedUser = await baseUrl.put(`/User/${userId}`, { friendRequestId: loggedInUser.id });
      console.log("Friend request sent to user with id:", userId);
    } catch (error) {
      console.error("Error sending friend request:", error);
    }
  };

  if (!loggedInUser) {
    return <div>Loading...</div>; // Show loading state while waiting for user data
  }

  return (
    <div className="container mt-5">
      <div className="row" style={{ marginTop: "100px" }}>
        <div className="col-md-8">
          <div className="card">
            <div className="card-body text-center">
              <img src={loggedInUser.avatar} className="w-50 mb-3" alt="User" />
              <h4>{loggedInUser.username}</h4>
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
                {usersData.map((user) => (
                  <div className="p-2 text-center" key={user.id}>
                    <img
                      src={user.avatar}
                      className="rounded w-25"
                      alt={user.username}
                    />
                    <p>{user.username}</p>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleFriendRequest(user.id)}
                    >
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
              <p className="card-text">{loggedInUser.bio}</p>
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
              <h5 className="card-title">Bạn bè</h5>
              <div className="d-flex flex-wrap">
                {loggedInUser.friends.map((friend) => (
                  <div className="p-2 text-center" key={friend.userId}>
                    <img
                      src={
                        usersData.find((user) => user.id === friend.userId)
                          ?.avatar
                      }
                      className="rounded w-25"
                      alt={
                        usersData.find((user) => user.id === friend.userId)
                          ?.username
                      }
                    />
                    <p>
                      {
                        usersData.find((user) => user.id === friend.userId)
                          ?.username
                      }
                    </p>
                    {friend.status ? (
                      <span className="text-success">Bạn bè</span>
                    ) : (
                      <span className="text-warning">Đang chờ xác nhận</span>
                    )}
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
              <Form.Control
                type="text"
                placeholder="Nhập họ và tên"
                defaultValue={loggedInUser.username}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Nhập email"
                defaultValue={loggedInUser.email}
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control type="password" placeholder="Nhập mật khẩu" />
            </Form.Group>
            <Form.Group controlId="formImage">
              <Form.Label>Ảnh đại diện</Form.Label>
              <Form.Control
                type="text"
                placeholder="URL ảnh đại diện"
                defaultValue={loggedInUser.avatar}
              />
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
