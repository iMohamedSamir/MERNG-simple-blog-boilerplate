import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice.js";
import PostSlice from "./PostsSlice";

const store = configureStore({
  reducer: {
    posts: PostSlice.reducer,
    auth: AuthSlice.reducer,
  },
});

export default store;
