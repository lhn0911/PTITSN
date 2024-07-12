import React, { useEffect, useState } from "react";
import { Table, Button, Pagination } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { searchPosts, updatePostStatus } from "../../services/admin/Post";
import { Post } from "../../interface/index";

const PostManagement: React.FC = () => {
  const dispatch = useDispatch();

  // Chọn state từ Redux store
  const posts = useSelector(
    (state: RootState) => state.posts.searchResults || []
  );
  const postStatus = useSelector(
    (state: RootState) => state.posts.status || "idle"
  );
  const postError = useSelector(
    (state: RootState) => state.posts.error || null
  );
  const postTotalCount = useSelector(
    (state: RootState) => state.posts.totalCount || 0
  );

  const [postSearchTerm, setPostSearchTerm] = useState<string>("");
  const [postPage, setPostPage] = useState<number>(1);
  const postsPerPage = 10;

  useEffect(() => {
    dispatch(
      searchPosts({
        searchTerm: postSearchTerm,
        page: postPage,
        limit: postsPerPage,
      })
    );
  }, [dispatch, postPage, postSearchTerm]);

  const handlePostSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostSearchTerm(e.target.value);
    dispatch(
      searchPosts({ searchTerm: e.target.value, page: 1, limit: postsPerPage })
    );
  };

  const handleTogglePostStatus = (postId: number, currentStatus: boolean) => {
    dispatch(updatePostStatus({ postId, status: !currentStatus }));
  };

  const handlePostPageChange = (page: number) => {
    setPostPage(page);
    dispatch(
      searchPosts({ searchTerm: postSearchTerm, page, limit: postsPerPage })
    );
  };

  const postPagination = () => {
    const pages = Math.ceil(postTotalCount / postsPerPage);
    let items = [];
    for (let number = 1; number <= pages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === postPage}
          onClick={() => handlePostPageChange(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    return items;
  };

  return (
    <div className="search-container">
      <h2>Quản lý Bài viết</h2>
      <input
        type="text"
        value={postSearchTerm}
        onChange={handlePostSearch}
        placeholder="Tìm kiếm bài viết..."
      />
      <Button
        onClick={() =>
          dispatch(
            searchPosts({
              searchTerm: postSearchTerm,
              page: 1,
              limit: postsPerPage,
            })
          )
        }
      >
        Tìm kiếm
      </Button>
      {postStatus === "loading" && <p>Loading...</p>}
      {postError && <p>{postError}</p>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Content</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {posts.length > 0 ? (
            posts.map((post: Post) => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>{post.content}</td>
                <td>{post.status ? "Locked" : "Active"}</td>
                <td>
                  <Button
                    onClick={() => handleTogglePostStatus(post.id, post.status)}
                  >
                    {post.status ? "Unlock" : "Lock"}
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>No posts found</td>
            </tr>
          )}
        </tbody>
      </Table>
      <Pagination>{postPagination()}</Pagination>
    </div>
  );
};

export default PostManagement;
