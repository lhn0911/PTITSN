import React, { useState, useEffect } from "react";
import baseURL from "../../api/index";
import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function User() {
  const [userData, setUserData] = useState(null);
  const [friendsData, setFriendsData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    img: "",
  });
  const [friendRequests, setFriendRequests] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await baseURL.get("/User");
        const loggedInUser = response.data.find((user) => user.status === true); // Assuming the logged-in user has status true
        setUserData(loggedInUser);
        setFriendsData(
          response.data.filter((user) => user.id !== loggedInUser.id)
        );
        setFormData(loggedInUser);

        // Initialize friend requests state
        const requests = {};
        loggedInUser.addfriend?.forEach((friend) => {
          requests[friend.id] = true;
        });
        setFriendRequests(requests);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await baseURL.put(`/User/${userData.id}`, formData);
      setUserData(formData);
      handleCloseModal();
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const handleAddFriend = async (friend) => {
    if (!friendRequests[friend.id]) {
      try {
        // Add the logged-in user to the friend's addfriend list
        const updatedFriend = {
          ...friend,
          addfriend: [
            ...(friend.addfriend || []),
            { id: userData.id, name: userData.name, status: false },
          ],
        };
        await baseURL.put(`/User/${friend.id}`, updatedFriend);

        // Update local state to show "Đã gửi lời mời"
        setFriendRequests((prev) => ({
          ...prev,
          [friend.id]: true,
        }));
      } catch (error) {
        console.error("Error sending friend request:", error);
      }
    }
  };

  const handleFriendsButtonClick = () => {
    navigate("/friends");
  };

  if (!userData) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      <div className="row" style={{ marginTop: "100px" }}>
        <div className="col-md-8">
          <div className="card">
            <div className="card-body text-center">
              <img src={userData.img} className="w-50 mb-3" alt="User" />
              <h4>{userData.name}</h4>
              <button className="btn btn-primary btn-sm mx-2">
                Thêm vào tin
              </button>
              <button
                className="btn btn-secondary btn-sm mx-2"
                onClick={handleShowModal}
              >
                Chỉnh sửa trang cá nhân
              </button>
              <button
                className="btn btn-secondary btn-sm mx-2"
                onClick={handleFriendsButtonClick}
              >
                Bạn Bè
              </button>
            </div>
          </div>
          <div className="card mt-3">
            <div className="card-body">
              <h5 className="card-title">Những người bạn có thể biết</h5>
              <div className="d-flex flex-wrap">
                {friendsData.map((user) => (
                  <div className="p-2 text-center" key={user.id}>
                    <img
                      src={user.img}
                      className="rounded"
                      style={{ width: "100px" }}
                      alt={user.name}
                    />
                    <p>{user.name}</p>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleAddFriend(user)}
                      disabled={friendRequests[user.id]}
                    >
                      {friendRequests[user.id]
                        ? "Đã gửi lời mời"
                        : "Thêm bạn bè"}
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
        {/* ... (rest of the component remains unchanged) ... */}
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        {/* ... (modal content remains unchanged) ... */}
      </Modal>
    </div>
  );
}
