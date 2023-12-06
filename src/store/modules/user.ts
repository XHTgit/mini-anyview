import { createSlice } from "@reduxjs/toolkit";

const userStore = createSlice({
  name: "user",
  initialState: {
    token: sessionStorage.getItem("mini_Anyview_token") || "",
    userInfo: sessionStorage.getItem("mini_Anyview_userInfo") || {},
  },
  reducers: {
    setToken(state, actions) {
      state.token = actions.payload;
      sessionStorage.setItem("mini_Anyview_token", actions.payload);
    },
    setUserInfo(state, actions) {
      state.userInfo = actions.payload;
      sessionStorage.setItem("mini_Anyview_userInfo", actions.payload);
    },
  },
});

const { setToken, setUserInfo } = userStore.actions;

const userReducer = userStore.reducer;

export { setToken, setUserInfo };

export default userReducer;
