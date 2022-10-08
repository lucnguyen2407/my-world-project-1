import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createAccountTypeData,
  userDataUpdateType,
  userLoginTypeData,
  userStateType,
} from "../../types/index.type";

interface userAuthType {
  isLoginSuccess: boolean;
  isLoading: boolean;
  userState: userStateType;
}
const initialState: userAuthType = {
  isLoginSuccess: false,
  isLoading: false,
  userState: {
    user: {
      email: "",
      bio: "",
      image: "",
      token: "",
      username: "",
    },
  },
};

const authSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    getCurrentUser(state) {
      state.isLoginSuccess = true;
    },
    login: (state, action: PayloadAction<userLoginTypeData>) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action: PayloadAction<userStateType>) => {
      state.userState.user = action.payload.user;
      state.isLoginSuccess = true;
      state.isLoading = false;
    },
    loginFailed: (state, action: PayloadAction<userStateType>) => {
      state.isLoginSuccess = false;
      state.isLoading = false;
    },
    logout: (state) => {
      state.isLoginSuccess = false;
    },
    createAccount(state, action: PayloadAction<createAccountTypeData>) {
      state.isLoading = true;
    },
    createAccountSuccess(state, action: PayloadAction<userStateType>) {
      state.isLoading = false;
      state.isLoginSuccess = true;
      state.userState.user = action.payload.user;
      console.log(state.userState.user);
    },
    createFaile(state) {
      state.isLoading = false;
      state.isLoginSuccess = false;
    },
    updateUserProfile(state, action: PayloadAction<userDataUpdateType>) {
      state.isLoading = true;
    },
    updateUserSuccess(state, action: PayloadAction<userStateType>) {
      state.isLoading = false;
      state.userState = action.payload;
    },
    updateUserFail(state) {
      state.isLoading = false;
    },
  },
});

// create  reducer
const authReducer = authSlice.reducer;

//export
export const {
  login,
  getCurrentUser,
  loginSuccess,
  loginFailed,
  logout,
  createAccount,
  createAccountSuccess,
  createFaile,
  updateUserSuccess,
  updateUserProfile,
  updateUserFail,
} = authSlice.actions;

export default authReducer;
