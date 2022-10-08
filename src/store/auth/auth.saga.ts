import { call, put, takeLatest } from "redux-saga/effects";
import {
  createAccount,
  createAccountSuccess,
  createFaile,
  getCurrentUser,
  login,
  loginSuccess,
  updateUserFail,
  updateUserProfile,
  updateUserSuccess,
} from "./auth.slice";
import AuthApi from "./../../api/auth.api";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  createAccountTypeData,
  indexTypeData,
  userDataUpdateType,
  userLoginTypeData,
  userStateType,
} from "../../types/index.type";
import { toast } from "react-toastify";
import {
  getAllArticles,
  getAllArticlesSuccess,
} from "../article/article.slice";
import ProducApi from "./../../api/Product.api";
import { AxiosError } from "axios";

function* handleCreateAccount(action: PayloadAction<createAccountTypeData>) {
  try {
    const res: userStateType = yield AuthApi.createAccount(action.payload);
    console.log(res);
    yield put(createAccountSuccess(res));
    const resAll: indexTypeData = yield ProducApi.getProducts({});
    yield put(getAllArticlesSuccess(resAll));
    toast.success("Register Success");
    localStorage.setItem("access_token", res.user.token);
  } catch (error) {
    yield put(createFaile());
    toast.error("Error creating account");
  }
}
function* handleCurrentUser() {
  try {
    const token = localStorage.getItem("access_token");
    if (token) {
      const res: userStateType = yield AuthApi.getUserCurrent();
      yield put(loginSuccess(res));
    }
  } catch (error) {}
}
function* handleLogin(action: PayloadAction<userLoginTypeData>) {
  try {
    const res: userStateType = yield AuthApi.login(action.payload);

    yield put(createAccountSuccess(res));
    toast.success("Login Success");
    localStorage.setItem("access_token", res.user.token);
    const resAll: indexTypeData = yield ProducApi.getProducts({});
    yield put(getAllArticlesSuccess(resAll));

    // console.log(res);
  } catch (error) {
    yield put(createFaile());
    toast.error("Email or password incorrect");
  }
}

export function* handleChangeUserProfile(
  action: PayloadAction<userDataUpdateType>
) {
  try {
    const res: userStateType = yield call(
      AuthApi.updateCurrentUser,
      action.payload
    );
    yield put(updateUserSuccess(res));
    toast.success("Update Success");
  } catch (error) {
    yield put(updateUserFail());
    const err = error as AxiosError;
    if (err.response) {
      console.log(err.response);
    }
  }
}

export function* AuthSaga() {
  yield takeLatest(createAccount.type, handleCreateAccount);
  yield takeLatest(login.type, handleLogin);
  yield takeLatest(getCurrentUser.type, handleCurrentUser);
  yield takeLatest(updateUserProfile.type, handleChangeUserProfile);
}
