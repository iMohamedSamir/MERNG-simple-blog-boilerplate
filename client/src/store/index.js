import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice.js";
import PostSlice from "./postsSlice";

const store = configureStore({
  reducer: {
    posts: PostSlice.reducer,
    auth: AuthSlice.reducer,
  },
});

export default store;
