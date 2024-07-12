import { createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from "../../api";

export const searcPost: any = createAsyncThunk(
  "users/searchPosts",
  async (searchTerm: string) => {
    const response = await baseUrl.get(`/Post?_&username_like=${searchTerm}`);
    return response.data;
  }
);

export const updatePostStatus: any = createAsyncThunk(
  "users/updatePostStatus",
  async ({ postId, status }: { postId: number; status: string }) => {
    const response = await baseUrl.patch(`/User/${postId}`, { status });
    return response.data;
  }
);
