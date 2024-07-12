import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import friendReducer from './reducers/friendReducer';
import groupReducer from './reducers/groupReducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
    friend: friendReducer,
    group: groupReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;