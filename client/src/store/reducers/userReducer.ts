import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUser, addFriend, addPhoto, updateBio } from '../../services/user/userServices';
import { User } from '../../interface';

export interface UserState {
  currentUser: User | null;
  friends: User[];
  photos: string[];
  bio: string;
  error: string | null;
}

const initialState: UserState = {
  currentUser: null,
  friends: [],
  photos: [],
  bio: '',
  error: null,
};

const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
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
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = action.error.message ?? 'Failed to fetch user data.';
      })
      .addCase(addFriend.fulfilled, (state, action) => {
        state.friends.push(action.payload);
        state.error = null;
      })
      .addCase(addFriend.rejected, (state, action) => {
        state.error = action.error.message ?? 'Failed to add friend.';
      })
      .addCase(addPhoto.fulfilled, (state, action) => {
        state.photos.push(action.payload);
        state.error = null;
      })
      .addCase(addPhoto.rejected, (state, action) => {
        state.error = action.error.message ?? 'Failed to add photo.';
      })
      .addCase(updateBio.fulfilled, (state, action) => {
        state.bio = action.payload;
        state.error = null;
      })
      .addCase(updateBio.rejected, (state, action) => {
        state.error = action.error.message ?? 'Failed to update bio.';
      });
  },
});

export const { setError, clearError, login, logout } = userReducer.actions;
export default userReducer.reducer;