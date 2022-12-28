import { createSlice, current } from "@reduxjs/toolkit";

const UsersSlice = createSlice({
    name: "storeUsers",
    initialState: {
        content: [],
    },
    reducers: {
        UserReducer: (state, action) => {
            return {
                ...state,
                "content": action.payload
            }
        },
        AddUser: (state, action) => {
            return {
                ...state,
                "content": [action.payload, ...state.content]
            }
        },
        EditUser: (state, action) => {
            return {
                ...state,
                "content": current(state).content.map(user => user.id === action.payload.id && (action.payload || user)) 
            }
        },
        DeleteUser: (state, action) => {
            return {
                ...state,
                "content": current(state).content.filter(user => user.id !== action.payload) 
            }
        }
    }
})

export const UserActions = UsersSlice.actions;
export default UsersSlice;