import { createSlice, configureStore } from "@reduxjs/toolkit";

//Initial state và slice cho phần popUp ở trang chủ, lưu trữ Id sản phẩm được click vào và biến quản lý show hay hide popUp
const initialStatePopup = {
  popUpProductId: "",
  popUpShow: false,
};
const popUpSlice = createSlice({
  name: "popup",
  initialState: initialStatePopup,
  reducers: {
    showPopup: (state, action) => {
      state.popUpShow = !state.popUpShow;
    },
    getDataPopup: (state, action) => {
      state.popUpProductId = action.payload;
    },
  },
});
//Initial state và slice cho phần filter sản phẩm theo category ở trang shop, quản lý category ở trang shop, category mặc định là "All"
const initialStateCategory = {
  category: "All",
};
const selectCategorySlice = createSlice({
  name: "category",
  initialState: initialStateCategory,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});

//Initial state và slice cho phần login và signup, nếu biến currUser lấy từ localstage là mảng rỗng thì là người dùng chưa đăng nhập
// Lưu thông tin người dùng hiện tại bằng data lấy từ mảng currUser của localstorage
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
//Initial state và slice cho phần cart chứa 1 key lưu danh sách list sản phẩm có trong cart và 1 biến tính tổng giá tiền
const initialStateCart = {
  listCart: [],
  totalPrice: 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState: initialStateCart,
  reducers: {
    //Update lại giá tổng
    UPDATECART: (state, action) => {
      state.listCart = action.payload;
      state.totalPrice = state.listCart.reduce((acc, cur) => {
        return acc + cur.quantity * cur.productId.price;
      }, 0);
    },
  },
});
//Biến chứa data lưu trữ store bởi các reducer của các slice
const store = configureStore({
  reducer: {
    popUp: popUpSlice.reducer,
    category: selectCategorySlice.reducer,
    login: loginSlice.reducer,
    cart: cartSlice.reducer,
  },
});
//Export các action từ các slice để dễ sử dụng
export const popupActions = popUpSlice.actions;
export const categoryActions = selectCategorySlice.actions;
export const loginActions = loginSlice.actions;
export const cartActions = cartSlice.actions;
export default store;
