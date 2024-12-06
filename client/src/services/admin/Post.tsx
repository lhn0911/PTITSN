import { createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from "../../api";
import { Post } from "../../interface/index";

// Tìm kiếm bài viết
export const searchPosts: any = createAsyncThunk<Post[], string>(
  "posts/searchPosts",
  async (searchTerm: string) => {
    const response = await baseUrl.get(`/Post?_content_like=${searchTerm}`);
    return response.data;
  }
);

// Cập nhật trạng thái bài viết
export const updatePostStatus: any = createAsyncThunk<
  Post,
  { postId: number; status: string }
>("posts/updatePostStatus", async ({ postId, status }) => {
  const response = await baseUrl.patch(`/Post/${postId}`, { status });
  return response.data;
});
