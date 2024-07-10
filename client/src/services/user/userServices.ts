import { createAsyncThunk } from '@reduxjs/toolkit';
import baseUrl from '../../api';
import { User } from "../../interface/index";

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (userId: number) => {
    const response = await baseUrl.get(`/users/${userId}`);
    return response.data;
  }
);

export const addFriend = createAsyncThunk(
  'user/addFriend',
  async (friendId: number) => {
    const response = await baseUrl.post(`/users/addFriend`, { friendId });
    return response.data;
  }
);

export const addPhoto = createAsyncThunk(
  'user/addPhoto',
  async (photoUrl: string) => {
    const response = await baseUrl.post(`/users/addPhoto`, { photoUrl });
    return response.data;
  }
);

export const updateBio = createAsyncThunk(
  'user/updateBio',
  async (bio: string) => {
    const response = await baseUrl.post(`/users/updateBio`, { bio });
    return response.data;
  }
);