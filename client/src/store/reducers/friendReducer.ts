import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Friend } from "../../interface/index";
import { fetchFriends, addFriend, updateFriend, deleteFriend } from "../../services/user/friendServices";

export interface FriendState {
    friends: Friend[];
    error: string | null;
  }

const initialState: FriendState = {
  friends: [],
  error: null,
};

const friendSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFriends.fulfilled, (state, action) => {
        state.friends = action.payload;
        state.error = null;
      })
      .addCase(fetchFriends.rejected, (state, action) => {
        state.error = action.error.message ?? "Failed to fetch friends.";
      })
      .addCase(addFriend.fulfilled, (state, action) => {
        state.friends.push(action.payload);
        state.error = null;
      })
      .addCase(addFriend.rejected, (state, action) => {
        state.error = action.error.message ?? "Failed to add friend.";
      })
      .addCase(updateFriend.fulfilled, (state, action) => {
        const index = state.friends.findIndex(
          (friend) => friend.id === action.payload.id
        );
        if (index !== -1) {
          state.friends[index] = action.payload;
          state.error = null;
        }
      })
      .addCase(updateFriend.rejected, (state, action) => {
        state.error = action.error.message ?? "Failed to update friend.";
      })
      .addCase(deleteFriend.fulfilled, (state, action) => {
        state.friends = state.friends.filter(
          (friend) => friend.id !== action.payload
        );
        state.error = null;
      })
      .addCase(deleteFriend.rejected, (state, action) => {
        state.error = action.error.message ?? "Failed to delete friend.";
      });
  },
});

export const { setError, clearError } = friendSlice.actions;
export default friendSlice.reducer;