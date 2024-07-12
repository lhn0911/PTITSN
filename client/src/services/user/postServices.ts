import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import baseUrl from '../../api/index';
import { Post } from '../../interface/index';

// Định nghĩa kiểu cho state của slice
interface PostsState {
  posts: Post[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Định nghĩa state ban đầu
const initialState: PostsState = {
  posts: [],
  status: 'idle',
  error: null,
};

// Thunk để lấy danh sách bài viết
export const fetchPosts:any = createAsyncThunk(
  'posts/fetchPosts',
  async () => {
    const response = await baseUrl.get('/posts');
    return response.data;
  }
);

// Thunk để đăng bài viết
export const createPost:any = createAsyncThunk(
  'posts/createPost',
  async (newPost: Omit<Post, 'id'>) => {
    const response = await baseUrl.post('/posts', newPost);
    return response.data;
  }
);

// Thunk để cập nhật trạng thái bài viết (ẩn hoặc hiện)
export const updatePostStatus:any = createAsyncThunk(
  'posts/updatePostStatus',
  async ({ postId, status }: { postId: number; status: boolean }) => {
    const response = await baseUrl.patch(`/posts/${postId}`, { status });
    return response.data;
  }
);

// Thunk để xóa bài viết
export const deletePost:any = createAsyncThunk(
  'posts/deletePost',
  async (postId: number) => {
    await baseUrl.delete(`/posts/${postId}`);
    return postId;
  }
);