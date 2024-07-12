import { createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from "../../api";
import { User } from "../../interface/index";

export const searchUsers: any = createAsyncThunk(
  "users/searchUsers",
  async (searchTerm: string) => {
    const response = await baseUrl.get(`/User?search=${searchTerm}`);
    return response.data;
  }
);

export const updateUserStatus: any = createAsyncThunk(
  "users/updateUserStatus",
  async ({ userId, status }: { userId: number; status: string }) => {
    const response = await baseUrl.patch(`/User/${userId}`, { status });
    return response.data;
  }
);
