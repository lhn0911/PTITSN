import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';
import { Group } from '../../interface';

export const fetchGroups = createAsyncThunk<Group[]>(
  'groups/fetchGroups',
  async () => {
    const response = await api.get<Group[]>('/groups');
    return response.data;
  }
);

export const addGroup = createAsyncThunk<Group, Partial<Group>>(
  'groups/addGroup',
  async (newGroup) => {
    const response = await api.post<Group>('/groups', newGroup);
    return response.data;
  }
);

export const updateGroup = createAsyncThunk<Group, Group>(
  'groups/updateGroup',
  async (group) => {
    const response = await api.put<Group>(`/groups/${group.id}`, group);
    return response.data;
  }
);

export const deleteGroup = createAsyncThunk<number, number>(
  'groups/deleteGroup',
  async (groupId) => {
    await api.delete(`/groups/${groupId}`);
    return groupId;
  }
);