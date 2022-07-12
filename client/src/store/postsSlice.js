import { createSlice, current } from "@reduxjs/toolkit";

const PostSlice = createSlice({
  name: "storePosts",
  initialState: {
    content: [],
  },
  reducers: {
    PostsReducer: (state, action) => {
        return {
          ...state,
          "content": action.payload
        }
      },
      AddPost: (state, action) => {
        const newPost = action.payload
        console.log("newPost>0>", newPost)
        return {
          ...state.content, 
          "content": [action.payload, ...state.content]
        }
      },
      editPost: (state, action) => {
      return {
        ...state,
        "content": current(state).content.map(post => post.id === action.payload.id && action.payload || post)
      }
    },
    deletePost: (state, action) => {
      const id = action.payload
      return {
        ...state, 
        "content": current(state).content.filter((post) => (post.id !== id))
      }
    },
  },
});

export const postsActions = PostSlice.actions;
export default PostSlice;