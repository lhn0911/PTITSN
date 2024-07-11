// src/store/reducers/userReducer.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../interface/index';
import { fetchUser, addFriend, addPhoto, updateBio } from '../../services/user/userServices';

// Định nghĩa giao diện của trạng thái người dùng trong Redux store
export interface UserState {
  currentUser: User | null;
  friends: User[];
  photos: string[];
  bio: string;
  error: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

// Trạng thái khởi tạo của người dùng
const initialState: UserState = {
  currentUser: null,
  friends: [],
  photos: [],
  bio: '',
  error: null,
  status: 'idle',
};

// Tạo Redux slice cho người dùng
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    // Đăng nhập và lưu thông tin người dùng vào Redux store
    login(state, action: PayloadAction<User>) {
      state.currentUser = action.payload;
    },
    // Đăng xuất và xóa thông tin người dùng và các dữ liệu liên quan
    logout(state) {
      state.currentUser = null;
      state.friends = [];
      state.photos = [];
      state.bio = '';
    },
    // Cập nhật thông tin của người dùng
    updateUser(state, action: PayloadAction<Partial<User>>) {
      if (state.currentUser) {
        state.currentUser = { ...state.currentUser, ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Xử lý trạng thái khi đang tải thông tin người dùng
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
      })
      // Xử lý trạng thái khi lấy thông tin người dùng thành công
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentUser = action.payload.user;
        state.error = null;
      })
      // Xử lý trạng thái khi lấy thông tin người dùng thất bại
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      // Xử lý trạng thái khi đang thêm bạn
      .addCase(addFriend.pending, (state) => {
        state.status = 'loading';
      })
      // Xử lý trạng thái khi thêm bạn thành công
      .addCase(addFriend.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.friends.push(action.payload.friend);
        state.error = null;
      })
      // Xử lý trạng thái khi thêm bạn thất bại
      .addCase(addFriend.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      // Xử lý trạng thái khi đang thêm ảnh
      .addCase(addPhoto.pending, (state) => {
        state.status = 'loading';
      })
      // Xử lý trạng thái khi thêm ảnh thành công
      .addCase(addPhoto.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.photos.push(action.payload.photoUrl);
        state.error = null;
      })
      // Xử lý trạng thái khi thêm ảnh thất bại
      .addCase(addPhoto.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      // Xử lý trạng thái khi đang cập nhật bio
      .addCase(updateBio.pending, (state) => {
        state.status = 'loading';
      })
      // Xử lý trạng thái khi cập nhật bio thành công
      .addCase(updateBio.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.bio = action.payload.bio;
        state.error = null;
      })
      // Xử lý trạng thái khi cập nhật bio thất bại
      .addCase(updateBio.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

// Export các action creators để sử dụng trong các component
export const { clearError, login, logout, updateUser } = userSlice.actions;

// Export reducer để tích hợp vào Redux store
export default userSlice.reducer;
