// src/store/reducers/userReducer.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../interface/index';
import {
  searchUsers,
  updateUserStatus
} from '../../services/admin/User';
import {  fetchUser,
  addFriend,
  addPhoto,
  updateBio} from "../../services/user/userServices"
export interface UserState {
  currentUser: User | null;
  friends: User[];
  photos: string[];
  bio: string;
  error: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  searchResults: User[];
}

const initialState: UserState = {
  currentUser: null,
  friends: [],
  photos: [],
  bio: '',
  error: null,
  status: 'idle',
  searchResults: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    login(state, action: PayloadAction<User>) {
      state.currentUser = action.payload;
    },
    logout(state) {
      state.currentUser = null;
      state.friends = [];
      state.photos = [];
      state.bio = '';
      state.searchResults = [];
    },
    updateUser(state, action: PayloadAction<Partial<User>>) {
      if (state.currentUser) {
        state.currentUser = { ...state.currentUser, ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch User
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentUser = action.payload.user;
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })

      // Add Friend
      .addCase(addFriend.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addFriend.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.friends.push(action.payload.friend);
        state.error = null;
      })
      .addCase(addFriend.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })

      // Add Photo
      .addCase(addPhoto.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addPhoto.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.photos.push(action.payload.photoUrl);
        state.error = null;
      })
      .addCase(addPhoto.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })

      // Update Bio
      .addCase(updateBio.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateBio.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.bio = action.payload.bio;
        state.error = null;
      })
      .addCase(updateBio.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })

      // Search Users
      .addCase(searchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.searchResults = action.payload;
        state.error = null;
      })
      .addCase(searchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })

      // Update User Status (Lock/Unlock)
      .addCase(updateUserStatus.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserStatus.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Cập nhật trạng thái user trong searchResults
        state.searchResults = state.searchResults.map(user => 
          user.id === action.payload.id ? action.payload : user
        );
        // Cập nhật trạng thái user trong friends nếu cần
        state.friends = state.friends.map(user => 
          user.id === action.payload.id ? action.payload : user
        );
        // Cập nhật currentUser nếu đó là user đang đăng nhập
        if (state.currentUser && state.currentUser.id === action.payload.id) {
          state.currentUser = action.payload;
        }
        state.error = null;
      })
      .addCase(updateUserStatus.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { clearError, login, logout, updateUser } = userSlice.actions;

export default userSlice.reducer;