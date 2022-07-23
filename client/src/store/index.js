import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice.js";
import PostSlice from "./PostsSlice";
import UsersSlice from "./UsersSlice.js";

const store = configureStore({
  reducer: {
    posts: PostSlice.reducer,
    users: UsersSlice.reducer,
    auth: AuthSlice.reducer,
  },
});

export default store;