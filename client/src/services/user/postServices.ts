import { createAsyncThunk } from '@reduxjs/toolkit';
import baseUrl from '../../api/index';
import { Post } from '../../interface/index';

// Thunk để lấy danh sách bài viết
export const fetchPosts = createAsyncThunk<Post[], void, { rejectValue: string }>(
  'posts/fetchPosts',
  async (_, thunkAPI) => {
    try {
      const response = await baseUrl.get('/posts');
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Failed to fetch posts');
    }
  }
);

// Thunk để đăng bài viết
export const createPost = createAsyncThunk<Post, Omit<Post, 'id'>, { rejectValue: string }>(
  'posts/createPost',
  async (newPost, thunkAPI) => {
    try {
      const response = await baseUrl.post('/posts', newPost);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Failed to create post');
    }
  }
);

// Thunk để cập nhật trạng thái bài viết (ẩn hoặc hiện)
export const updatePostStatus = createAsyncThunk<Post, { postId: number; status: boolean }, { rejectValue: string }>(
  'posts/updatePostStatus',
  async ({ postId, status }, thunkAPI) => {
    try {
      const response = await baseUrl.patch(`/posts/${postId}`, { status });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Failed to update post status');
    }
  }
);

// Thunk để xóa bài viết
export const deletePost = createAsyncThunk<number, number, { rejectValue: string }>(
  'posts/deletePost',
  async (postId, thunkAPI) => {
    try {
      await baseUrl.delete(`/posts/${postId}`);
      return postId;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Failed to delete post');
    }
  }
);
