import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import friendReducer from './reducers/friendReducer';
import groupReducer from './reducers/groupReducer';
import postReducer from './reducers/postReducer';
export const store = configureStore({
  reducer: {
    user: userReducer,
    friend: friendReducer,
    group: groupReducer,
    post:postReducer
  },
});
export type RootState = ReturnType<typeof store.getState>;