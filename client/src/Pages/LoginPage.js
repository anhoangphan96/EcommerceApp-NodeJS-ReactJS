import { redirect } from "react-router-dom";
import UserForm from "../Components/UserForm";
import { loginActions } from "../redux/store";
import store from "../redux/store";

const LoginPage = function () {
  //Loginpage sẽ chứa chủ yếu là User Form
  return <UserForm></UserForm>;
};
export default LoginPage;
//Hàm bất đồng bộ xử lý dữ liệu người dùng submit bằng component <Form> của react router
export async function action({ request }) {
  //Khai báo các biến lấy từ localstorage, userList và Current user
  const userList = JSON.parse(localStorage.getItem("userList")) ?? [];
  const currUser = JSON.parse(localStorage.getItem("currUser")) ?? [];
  //Khai báo biến để lấy được URL
  const searchParams = new URL(request.url).searchParams;
  //Biến mode lấy từ param của URL
  const mode = searchParams.get("mode");
  //data của người dùng khi submit form  lấy bằng request nhận vào và method formData()
  const data = await request.formData();
  // Lưu Fromdata 4 loại data trong object nếu mode = signup và 2 loại data nếu mode là login
  let formData = {
    name: data.get("name"),
    email: data.get("email"),
    password: data.get("password"),
    phone: data.get("phone"),
  };

  if (mode === "login") {
    formData = {
      email: data.get("email"),
      password: data.get("password"),
    };
  }
  // Khai báo biến lưu trữ các lỗi liên quan cho từng loại input data
  let errorInput = {
    name: "",
    email: "",
    password: "",
    phone: "",
  };
  //Xây dựng function check xem user có tồn tại hay chưa, nếu đã tồn tại thì dừng vòng lặp và biến existing thành true, nêu k thì false
  const checkUserEmail = (email) => {
    let existing = false;
    for (let i = 0; i < userList.length; i++) {
      if (userList[i].email === email) {
        existing = true;
        break;
      }
    }
    return existing;
  };
  //Xây dựng function check data login user có khớp với email và password đã tồn tại không,
  const checkUserDataLogin = (formData) => {
    let correctUser = false;
    for (let i = 0; i < userList.length; i++) {
      if (
        userList[i].email === formData.email &&
        userList[i].password === formData.password
      ) {
        correctUser = true;
        break;
      }
    }
    return correctUser;
  };
  //Xây dựng fucntion data validate for signup
  const validateSignupLogin = (formData) => {
    //Mặc định validate bằng true và khi nào có lỗi thì sẽ chuyển thành false
    let validate = true;
    //lưu message lỗi theo từng field input và mode
    for (let data in formData) {
      if (!formData[data].trim()) {
        validate = false;
        errorInput[data] = `You must input ${data} field`;
      } else {
        if (
          mode === "signup" &&
          data === "email" &&
          checkUserEmail(formData[data])
        ) {
          validate = false;
          errorInput.email =
            "This email is existing please choose the other one";
        } else if (
          mode === "signup" &&
          data === "password" &&
          formData[data].length < 8
        ) {
          validate = false;
          errorInput.password = "Your password must be more than 8 characters";
        } else if (mode === "login" && !checkUserDataLogin(formData)) {
          validate = false;
          errorInput.password = "Your email or password is incorrect";
        }
      }
    }
    //Trả về giá trị của hàm validate nếu không có lỗi nào là true nếu có là false
    return validate;
  };
  //Sau khi nhận được data từ Form gửi vào request thì tiến hành check và thêm user và userList trong localstorage
  // Giá trị dưới khung if này sẽ là giá trị trả ra của action, nếu không có lỗi thì ta lưu các thông tin theo mode, nếu signup push new user vào list và lưu vào local storage
  // lưu current user  nếu là login vào redux và localstorage rồi return redirect về trang homepage
  //Nếu có lỗi thì sẽ return error data của biến errorInput
  if (validateSignupLogin(formData)) {
    if (mode === "signup") {
      userList.push(formData);
      localStorage.setItem("userList", JSON.stringify(userList));
      return redirect("/login?mode=login");
    } else if (mode === "login") {
      currUser.push(
        userList.filter((user) => user.email === formData.email)[0]
      );
      localStorage.setItem("currUser", JSON.stringify(currUser));
      store.dispatch(loginActions.ON_LOGIN(currUser));
      return redirect("/");
    }
  } else {
    return errorInput;
  }
}
