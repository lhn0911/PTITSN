import { createSlice } from '@reduxjs/toolkit';
import { fetchGroups, addGroup, updateGroup, deleteGroup } from '../../services/user/groupService';
import { Group } from '../../interface/index';
import {searchGroups, updateGroupStatus} from "../../services/admin/Group"
export interface GroupState {
  groups: Group[];
  error: string | null;
  isLoading: boolean;
}

const initialState: GroupState = {
  groups: [],
  error: null,
  isLoading: false,
};

const groupSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    setGroups: (state, action) => {
      state.groups = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Groups
      .addCase(fetchGroups.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.isLoading = false;
        state.groups = action.payload;
        state.error = null;
      })
      .addCase(fetchGroups.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Failed to fetch groups';
      })
      // Add Group
      .addCase(addGroup.fulfilled, (state, action) => {
        state.groups.push(action.payload);
      })
      // Update Group
      .addCase(updateGroup.fulfilled, (state, action) => {
        const index = state.groups.findIndex(group => group.id === action.payload.id);
        if (index !== -1) {
          state.groups[index] = action.payload;
        }
      })
      // Delete Group
      .addCase(deleteGroup.fulfilled, (state, action) => {
        state.groups = state.groups.filter(group => group.id !== action.payload);
      })
      // Search Groups
      .addCase(searchGroups.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchGroups.fulfilled, (state, action) => {
        state.isLoading = false;
        state.groups = action.payload;
        state.error = null;
      })
      .addCase(searchGroups.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Failed to search groups';
      })
      // Update Group Status
      .addCase(updateGroupStatus.fulfilled, (state, action) => {
        const index = state.groups.findIndex(group => group.id === action.payload.id);
        if (index !== -1) {
          state.groups[index] = action.payload;
        }
      });
  },
});

export const { setGroups, setError, clearError } = groupSlice.actions;

export default groupSlice.reducer;
