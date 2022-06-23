import { createSlice } from "@reduxjs/toolkit";

const PostSlice = createSlice({
  name: "storePosts",
  initialState: {
    content: null,
  },
  reducers: {
    getPostsReducer: (state, action) => {
      state.content = action.payload;
    },
  },
});

export const postActions = PostSlice.actions;
export default PostSlice;
