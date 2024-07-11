
import { createAsyncThunk } from '@reduxjs/toolkit';
import baseUrl from '../../api';
export const fetchUser:any = createAsyncThunk(
  'user/fetchUser',
  async (userId, thunkAPI) => {
    try {
      const response = await baseUrl.get(`/users/${userId}`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Failed to fetch user');
    }
  }
);

export const addFriend:any = createAsyncThunk(
  'user/addFriend',
  async (friendId, thunkAPI) => {
    try {
      const response = await baseUrl.post(`/users/addFriend`, { friendId });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Failed to add friend');
    }
  }
);

export const addPhoto:any = createAsyncThunk(
  'user/addPhoto',
  async (photoUrl, thunkAPI) => {
    try {
      const response = await baseUrl.post(`/users/addPhoto`, { photoUrl });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Failed to add photo');
    }
  }
);

export const updateBio:any = createAsyncThunk(
  'user/updateBio',
  async (bio, thunkAPI) => {
    try {
      const response = await baseUrl.post(`/users/updateBio`, { bio });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Failed to update bio');
    }
  }
);
