import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../interface/index';
import {
  fetchPosts,
  createPost,
  updatePostStatus,
  deletePost,
} from '../../services/user/postServices';

// Định nghĩa kiểu cho state của slice
interface PostState {
  posts: Post[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Đặt giá trị mặc định cho trạng thái
const initialState: PostState = {
  posts: [],
  status: 'idle',
  error: null,
};

// Tạo slice cho bài viết
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Posts
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.status = 'succeeded';
        state.posts = action.payload;
        state.error = null;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })

      // Create Post
      .addCase(createPost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.posts.push(action.payload);
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })

      // Update Post Status
      .addCase(updatePostStatus.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updatePostStatus.fulfilled, (state, action: PayloadAction<Post>) => {
        const updatedPost = action.payload;
        const index = state.posts.findIndex(post => post.id === updatedPost.id);
        if (index !== -1) {
          state.posts[index] = updatedPost;
        }
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(updatePostStatus.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })

      // Delete Post
      .addCase(deletePost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deletePost.fulfilled, (state, action: PayloadAction<number>) => {
        const postId = action.payload;
        state.posts = state.posts.filter(post => post.id !== postId);
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = postsSlice.actions;

export default postsSlice.reducer;
