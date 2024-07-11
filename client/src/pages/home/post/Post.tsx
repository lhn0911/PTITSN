import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import "../Home.scss";

const Post = ({ post, comments, currentUser, onEdit, onDelete }: any) => {
  const postComments = comments.filter(
    (comment: any) => comment.post_id === post.id
  );

  const getTimeDifference = (createdAt: string) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffInSeconds = Math.floor(
      (now.getTime() - created.getTime()) / 1000
    );

    if (diffInSeconds < 60) return `${diffInSeconds} giây trước`;
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} phút trước`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} giờ trước`;
    if (diffInSeconds < 2592000)
      return `${Math.floor(diffInSeconds / 86400)} ngày trước`;
    if (diffInSeconds < 31536000)
      return `${Math.floor(diffInSeconds / 2592000)} tháng trước`;
    return `${Math.floor(diffInSeconds / 31536000)} năm trước`;
  };

  return (
    <div className="post">
      <div className="post-header d-flex justify-content-between">
        <div className="post-user-info d-flex">
          <img
            src={post.userImg}
            alt={post.user_name}
            className="user-avatar"
          />
          <div>
            <div className="post-user">{post.user_name}</div>
            <div className="post-time">{getTimeDifference(post.ceated_at)}</div>
          </div>
        </div>
        <div>
          {currentUser && currentUser.name === post.user_name && (
            <Dropdown>
              <Dropdown.Toggle variant="link" id="dropdown-basic">
                <span className="material-symbols-outlined">more_horiz</span>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => onEdit(post.id)}>
                  Chỉnh sửa
                </Dropdown.Item>
                <Dropdown.Item onClick={() => onDelete(post.id)}>
                  Xóa
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </div>
      </div>
      <div className="post-content">{post.content}</div>
      {post.image && post.image.length > 0 && (
        <img src={post.image[0]} alt="Post" className="post-img" />
      )}
      <div className="post-stats">
        <span>👍 {post.like}</span>
        <span>{post.comment} bình luận</span>
        <span>{post.share} chia sẻ</span>
      </div>
      <div className="post-actions">
        <button>👍 Thích</button>
        <button>💬 Bình luận</button>
        <button>🔗 Chia sẻ</button>
      </div>
      <div className="post-comments">
        {postComments.map((comment: any, index: number) => (
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
