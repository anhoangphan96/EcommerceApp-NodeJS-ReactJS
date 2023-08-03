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
const currUser = JSON.parse(localStorage.getItem("currUser")) ?? [];
const initialStateLogin = {
  isLogin: currUser.length > 0 ? true : false,
  curUser: currUser,
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
      state.curUser = [];
    },
  },
});
//Initial state và slice cho phần cart chứa 1 key lưu danh sách list sản phẩm có trong cart và 1 biến tính tổng giá tiền
const listCart = JSON.parse(localStorage.getItem("listCart")) ?? [];
const initialStateCart = {
  listCart: listCart,
  totalPrice: listCart
    .filter((arr) => arr.email === currUser)
    .map((arr) => arr.price * arr.quantity)
    .reduce((acc, cum) => acc + cum, 0),
};
const cartSlice = createSlice({
  name: "cart",
  initialState: initialStateCart,
  reducers: {
    //Add sản phẩm mới hoàn toàn vào cart
    ADD_CART: (state, action) => {
      state.listCart.push(action.payload);
    },
    //Update số lượng cho sản phẩm đã có trong cart
    UPDATE_CART: (state, action) => {
      const index = state.listCart.findIndex(
        (cart) => cart.id === action.payload.id
      );
      state.listCart[index] = {
        ...state.listCart[index],
        quantity: action.payload.quantity,
      };
    },
    //Xóa 1 sản phẩm ra khỏi cart, lọc listCart giữ lại những sản phẩm khác id của sản phẩm bị xóa hoặc khác email đang đăng nhập
    DELETE_CART: (state, action) => {
      state.listCart = state.listCart.filter(
        (cart) =>
          cart.id !== action.payload.id || cart.email !== action.payload.email
      );
    },
    //Update lại giá tổng
    UPDATE_TOTALPRICE: (state, action) => {
      state.totalPrice = state.listCart
        .filter((arr) => arr.email === action.payload)
        .map((arr) => arr.price * arr.quantity)
        .reduce((acc, cum) => acc + cum, 0);
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
