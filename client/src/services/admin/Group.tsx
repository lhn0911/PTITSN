import { createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from "../../api";
import { Group } from "../../interface/index";

// Tìm kiếm nhóm
export const searchGroups: any = createAsyncThunk<Group[], string>(
  "groups/searchGroups",
  async (searchTerm: string) => {
    const response = await baseUrl.get(`/Group?_name_like=${searchTerm}`);
    return response.data;
  }
);

// Cập nhật trạng thái nhóm
export const updateGroupStatus: any = createAsyncThunk<
  Group,
  { groupId: number; status: string }
>("groups/updateGroupStatus", async ({ groupId, status }) => {
  const response = await baseUrl.patch(`/Group/${groupId}`, { status });
  return response.data;
});
