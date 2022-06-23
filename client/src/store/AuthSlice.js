import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

let currentUser = null;

const storedToken = localStorage.getItem("jwtToken");

if (storedToken) {
  const decodedToken = jwtDecode(storedToken);
  decodedToken.exp * 1000 < Date.now()
    ? localStorage.removeItem("jwtToken")
    : (currentUser = decodedToken);
}

const AuthSlice = createSlice({
  name: "reduxAuth",
  initialState: { currentUser },
  reducers: {
    login: (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem("jwtToken", action.payload.token);
    },
    logout: async (state, action) => {
      state.currentUser = null;
      localStorage.removeItem("jwtToken");
    },
  },
});

export const AuthActions = AuthSlice.actions;
export default AuthSlice;
