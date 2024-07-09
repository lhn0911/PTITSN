import React, { useState, useEffect } from "react";
import MainLeft from "./main/Mainleft";
import MainRight from "./main/Mainright";
import StoriesSection from "./post/StoriesSection";
import Post from "./post/Post";
import CreatePostModal from "./post/CreatePostModaal";
import baseUrl from "../../api/index";
import "./Home.scss";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [stories, setStories] = useState([]);
  const [friends, setFriends] = useState([]);
  const [groups, setGroups] = useState([]);
  const [comments, setComments] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [modalShow, setModalShow] = useState(false);

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
          baseUrl.get("/friend"),
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

  const handlePost = async (newPost: any) => {
    if (newPost.content.trim() === "") return;

    const post = {
      id: posts.length + 1,
      user: currentUser.name,
      userImg: currentUser.avatar,
      content: newPost.content,
      visibility: newPost.visibility,
      image: newPost.image ? URL.createObjectURL(newPost.image) : null,
      like: 0,
      comment: 0,
      share: 0,
    };

    try {
      await baseUrl.post("/Post", post);
      setPosts([post, ...posts]);
    } catch (error) {
      console.error("Error posting data", error);
    }
  };

  const handleEditPost = (post: any) => {
    console.log("Edit post", post);
  };

  const handleDeletePost = async (postId: any) => {
    try {
      await baseUrl.delete(`/Post/${postId}`);
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post", error);
    }
  };

  return (
    <div className="main-container">
      <MainLeft groups={groups} friends={friends} />
      <div className="main-content">
        <div>
          <StoriesSection stories={stories} />
        </div>
        <div className="create-post">
          <div className="create-post-header d-flex flex-column">
            <div>
              {currentUser && (
                <img
                  src={currentUser.avatar}
                  alt="profile"
                  className="profile-img"
                />
              )}
              <input
                type="text"
                placeholder={`${
                  currentUser ? currentUser.name : "Hoàng"
                } ơi, bạn đang nghĩ gì thế?`}
                onClick={() => setModalShow(true)}
              />
            </div>
            <div className="d-flex mt-3 gap-5">
              <div className="d-flex">
                <span className="material-symbols-outlined">videocam</span>Video
                trực tiếp
              </div>
              <div className="d-flex">
                <span className="material-symbols-outlined">photo_library</span>
                Ảnh/Video
              </div>
              <div className="d-flex">
                <span className="material-symbols-outlined">mood</span>Biểu
                tượng cảm xúc
              </div>
            </div>
          </div>
        </div>
        {posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            comments={comments}
            currentUser={currentUser}
            onEdit={handleEditPost}
            onDelete={handleDeletePost}
          />
        ))}
      </div>
      <MainRight currentUser={currentUser} groups={groups} />
      <CreatePostModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        currentUser={currentUser}
        onPost={handlePost}
      />
    </div>
  );
}
