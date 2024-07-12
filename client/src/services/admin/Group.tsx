import { createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from "../../api";
import { Group } from "../../interface/index";

export const searcPost: any = createAsyncThunk(
  "users/searchGroup",
  async (searchTerm: string) => {
    const response = await baseUrl.get(`/Group?_&name_like=${searchTerm}`);
    return response.data;
  }
);

export const updatePostStatus: any = createAsyncThunk(
  "users/updateGroupStatus",
  async ({ groupId, status }: { groupId: number; status: string }) => {
    const response = await baseUrl.patch(`/Group/${groupId}`, { status });
    return response.data;
  }
);
