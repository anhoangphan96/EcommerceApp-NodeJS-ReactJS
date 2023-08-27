import { configureStore, createSlice } from "@reduxjs/toolkit";

//initialState va slice cho loggin/loggout state
const initialStateLogin = {
  isLogin: false,
  curUser: null,
};
const loginSlice = createSlice({
  name: "login",
  initialState: initialStateLogin,
  reducers: {
    //set trạng thái đăng nhập và thông tin người dùng đang đăng nhập
    ON_LOGIN: (state, action) => {
      state.isLogin = true;
      state.curUser = action.payload;
    },
    //Logout thì set mảng curUser thành mảng rỗng
    ON_LOGOUT: (state, action) => {
      state.isLogin = false;
      state.curUser = null;
    },
  },
});
export const loginActions = loginSlice.actions;

const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
  },
});

export default store;
