import { createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from "../../api";
import { Group } from "../../interface/index";

// Tìm kiếm nhóm
export const searchGroups: any = createAsyncThunk(
  "groups/searchGroups",
  async (searchTerm: string) => {
    const response = await baseUrl.get(`/Group`, {
      params: { name_like: searchTerm }, // Sử dụng params để truyền tham số tìm kiếm
    });
    return response.data; // Giả sử dữ liệu trả về là danh sách nhóm
  }
);

// Cập nhật trạng thái nhóm
export const updateGroupStatus: any = createAsyncThunk(
  "groups/updateGroupStatus",
  async ({ groupId, status }: { groupId: number; status: boolean }) => {
    const response = await baseUrl.patch(`/Group/${groupId}`, { status });
    return response.data; // Giả sử dữ liệu trả về là đối tượng nhóm đã cập nhật
  }
);
