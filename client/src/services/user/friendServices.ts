import { createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from '../../api';
import { Friend } from "../../interface/index";

export const fetchFriends = createAsyncThunk(
  "friends/fetchFriends",
  async () => {
    const response = await baseUrl.get("/friends");
    return response.data;
  }
);

export const addFriend = createAsyncThunk(
  "friends/addFriend",
  async (friend: Friend) => {
    const response = await baseUrl.post("/friends", friend);
    return response.data;
  }
);

export const updateFriend = createAsyncThunk(
  "friends/updateFriend",
  async (friend: Friend) => {
    const response = await baseUrl.put(`/friends/${friend.id}`, friend);
    return response.data;
  }
);

export const deleteFriend = createAsyncThunk(
  "friends/deleteFriend",
  async (friendId: number) => {
    await baseUrl.delete(`/friends/${friendId}`);
    return friendId;
  }
);