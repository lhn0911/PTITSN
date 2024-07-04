import React, { useState, useEffect } from "react";
import axios from "axios";
import baseUrl from "../../api/index";
import "./Home.scss";

const StoriesSection = ({ stories }) => {
  const [currentStory, setCurrentStory] = useState(0);

  const handleNext = () => {
    if (currentStory < stories.length - 4) {
      setCurrentStory((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStory > 0) {
      setCurrentStory((prev) => prev - 1);
    }
  };
  return (
    <div className="stories-section">
      {currentStory > 0 && (
        <button className="story-nav left" onClick={handleBack}>
          &#10094;
        </button>
      )}
      <div className="story-items">
        {stories.slice(currentStory, currentStory + 4).map((story, index) => (
          <div
            key={story.id}
            className={`story-item ${index === 0 ? "partial-left" : ""} ${
              index === 3 ? "partial-right" : ""
            }`}
          >
            <img src={story.image} alt={story.user} className="story-image" />
            <div className="story-user">{story.user}</div>
          </div>
        ))}
      </div>
      {currentStory < stories.length - 4 && (
        <button className="story-nav right" onClick={handleNext}>
          &#10095;
        </button>
      )}
    </div>
  );
};

const Post = ({ post, comments }) => {
  const postComments = comments.filter(
    (comment) => comment.post_id === post.id
  );

  return (
    <div className="post">
      <div className="post-header">
        <div className="post-user">{post.user}</div>
      </div>
      <div className="post-content">{post.content}</div>
      {post.image && <img src={post.image} alt="Post" className="post-img" />}
      <div className="post-comments">
        {postComments.map((comment, index) => (
          <div key={index} className="post-comment">
            <strong>{comment.username}: </strong>
            {comment.content}
          </div>
        ))}
      </div>
      <div className="post-actions">
        <button>{`👍 ${post.like}`}</button>
        <button>{`💬 ${post.comment}`}</button>
        <button>{`🔗 ${post.share}`}</button>
      </div>
    </div>
  );
};

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [stories, setStories] = useState([]);
  const [friends, setFriends] = useState([]);
  const [groups, setGroups] = useState([]);
  const [comments, setComments] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          postsResponse,
          storiesResponse,
          friendsResponse,
          groupsResponse,
          userResponse,
          commentsResponse,
        ] = await Promise.all([
          baseUrl.get("/Post"),
          baseUrl.get("/stories"),
          baseUrl.get("/friends"),
          baseUrl.get("/groups"),
          baseUrl.get("/User"),
          baseUrl.get("/comments"),
        ]);
        setPosts(postsResponse.data);
        setStories(storiesResponse.data);
        setFriends(friendsResponse.data);
        setGroups(groupsResponse.data);
        setComments(commentsResponse.data);
        setCurrentUser(userResponse.data[0]);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="main-container">
      <div className="main-left">
        <div className="group-chats">
          <h3>Cuộc trò chuyện nhóm</h3>
          {groups.map((group) => (
            <div key={group.id} className="group-chat">
              {group.name}
            </div>
          ))}
          <div className="group-chat create-group">Tạo nhóm mới</div>
        </div>
        <div className="contacts">
          <h3>Người liên hệ</h3>
          {friends.map((friend) => (
            <div key={friend.id} className="contact">
              {friend.name}
            </div>
          ))}
        </div>
      </div>
      <div className="main-content">
        <StoriesSection stories={stories} />
        <div className="create-post">
          <div className="create-post-header">
            {currentUser && (
              <img
                src={currentUser.img}
                alt="profile"
                className="profile-img"
              />
            )}
            <input type="text" placeholder="Hoàng ơi, bạn đang nghĩ gì thế?" />
          </div>
          <div className="create-post-actions">
            <button>
              <i className="fa-solid fa-video" style={{ color: "red" }}></i>
              Video trực tiếp
            </button>
            <button>
              <i className="fa-solid fa-image" style={{ color: "green" }}></i>
              Ảnh/video
            </button>
            <button>
              <i
                className="fa-solid fa-face-smile"
                style={{ color: "orange" }}
              ></i>
              Cảm xúc/hoạt động
            </button>
          </div>
        </div>
        {posts.map((post) => (
          <Post key={post.id} post={post} comments={comments} />
        ))}
      </div>
      <div className="main-right">
        <div className="user-info">
          {currentUser && <div className="user-name">{currentUser.name}</div>}
          <div className="user-menu">
            <div className="user-menu-item">Bạn bè</div>
            <div className="user-menu-item">Kỷ niệm</div>
            <div className="user-menu-item">Đã lưu</div>
            <div className="user-menu-item">Nhóm</div>
            <div className="user-menu-item">Video</div>
            <div className="user-menu-item">Xem thêm</div>
          </div>
        </div>
        <div className="user-activities">
          <h3>Lối tắt của bạn</h3>
          {groups.map((group) => (
            <div key={group.id} className="user-activity">
              {group.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
