import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { profilesApi } from "../../api/profile.api";
import { profileDataType } from "../../types/index.type";
import {
  fetchProfile,
  fetchProfileFailed,
  fetchProfileSuccess,
  followProfile,
  unfollowProfile,
} from "./profileSlice";

export function* pullProfile(action: PayloadAction<string>) {
  try {
    const response: profileDataType = yield call(
      profilesApi.getProfiles,
      action.payload
    );
    yield put(fetchProfileSuccess(response));
  } catch (error) {
    yield put(fetchProfileFailed);
  }
}
export function* handleFollow(action: PayloadAction<string>) {
  try {
    const res: profileDataType = yield call(
      profilesApi.followUser,
      action.payload
    );
    yield put(fetchProfileSuccess(res));
  } catch (error) {
    console.log(error);
    yield put(fetchProfileFailed);
  }
}
export function* handleUnFollow(action: PayloadAction<string>) {
  try {
    const res: profileDataType = yield call(
      profilesApi.unfollowUser,
      action.payload
    );
    yield put(fetchProfileSuccess(res));
  } catch (error) {
    console.log(error);
    yield put(fetchProfileFailed);
  }
}
export default function* profileSaga() {
  yield takeLatest(fetchProfile.type, pullProfile);
  yield takeLatest(followProfile.type, handleFollow);
  yield takeLatest(unfollowProfile.type, handleUnFollow);
}
