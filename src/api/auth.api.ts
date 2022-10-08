import { updateUserProfile } from "../pages/setting";
import { login } from "../store/auth/auth.slice";
import {
  createAccountTypeData,
  userDataUpdateType,
  userLoginTypeData,
  userStateType,
} from "../types/index.type";
import axiosInstance from "./index";

const AuthApi = {
  createAccount: (
    createAccount: createAccountTypeData
  ): Promise<createAccountTypeData> => {
    return axiosInstance.post("users", createAccount);
  },
  login(loginData: userLoginTypeData): Promise<userStateType> {
    return axiosInstance.post("users/login", loginData);
  },
  getUserCurrent(): Promise<userStateType> {
    return axiosInstance.get("user");
  },
  updateCurrentUser(
    updateUserData: userDataUpdateType
  ): Promise<userStateType> {
    return axiosInstance.put("user", updateUserData);
  },
};

export default AuthApi;
