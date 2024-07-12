import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import friendReducer from './reducers/friendReducer';
import groupReducer from './reducers/groupReducer';
import postsReducer from './reducers/postReducer'; // Đảm bảo đường dẫn chính xác

export const store = configureStore({
  reducer: {
    user: userReducer,
    friend: friendReducer,
    group: groupReducer,
    posts: postsReducer, // Đảm bảo tên này khớp với tên bạn sử dụng trong các slice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

