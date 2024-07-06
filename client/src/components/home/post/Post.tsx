import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import "../Home.scss";

const Post = ({ post, comments, currentUser, onEdit, onDelete }: any) => {
  const postComments = comments.filter(
    (comment: any) => comment.post_id === post.id
  );

  return (
    <div className="post">
      <div className="post-header d-flex justify-content-between">
        <div className="post-user-info d-flex">
          <img src={post.userImg} alt={post.user} className="user-avatar" />
          <div>
            <div className="post-user">{post.user}</div>
            <div className="post-time">{post.time} · 📢</div>
          </div>
        </div>
        <div>
          {currentUser && currentUser.name === post.user && (
            <span className="material-symbols-outlined">more_horiz</span>
          )}
        </div>
      </div>
      <div className="post-content">{post.content}</div>
      {post.image && <img src={post.image} alt="Post" className="post-img" />}
      <div className="post-stats">
        <span>👍❤️😆 {post.like}</span>
        <span>{post.comment} bình luận</span>
      </div>
      <div className="post-actions">
        <button>👍 Thích</button>
        <button>💬 Bình luận</button>
        <button>🔗 Chia sẻ</button>
      </div>
      <div className="post-comments">
        {postComments.map((comment: any, index: any) => (
          <div key={index} className="post-comment">
            <img
              src={comment.userImage}
              alt={comment.username}
              className="comment-user-avatar"
            />
            <div className="comment-content">
              <strong>{comment.username}</strong> {comment.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Post;
