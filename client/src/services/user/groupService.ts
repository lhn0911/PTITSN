import { createAsyncThunk } from '@reduxjs/toolkit';
import baseURL from '../../api';

export const fetchGroups:any = createAsyncThunk(
  'groups/fetchGroups',
  async () => {
    const response = await baseURL.get('/groups');
    return response.data;
  }
);

export const addGroup:any = createAsyncThunk(
  'groups/addGroup',
  async (newGroup: any) => {
    const response = await baseURL.post('/groups', newGroup);
    return response.data;
  }
);

export const updateGroup:any = createAsyncThunk(
  'groups/updateGroup',
  async (group: any) => {
    const response = await baseURL.put(`/groups/${group.id}`, group);
    return response.data;
  }
);

export const deleteGroup:any = createAsyncThunk(
  'groups/deleteGroup',
  async (groupId: number) => {
    await baseURL.delete(`/groups/${groupId}`);
    return groupId;
  }
);