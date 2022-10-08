import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { profileDataType } from "../../types/index.type";

interface profileState {
  isLoading?: boolean;
  currentProfile: profileDataType;
}

const initialState: profileState = {
  isLoading: false,
  currentProfile: {
    profile: {
      username: "",
      image: "",
      bio: "",
      following: false,
    },
  },
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    fetchProfile(state, action: PayloadAction<string | undefined>) {
      state.isLoading = true;
    },
    fetchProfileSuccess(state, action: PayloadAction<profileDataType>) {
      state.isLoading = false;
      state.currentProfile = action.payload;
    },
    fetchProfileFailed(state, action) {
      state.isLoading = false;
    },
    followProfile(state, action: PayloadAction<string>) {
      state.isLoading = true;
    },
    unfollowProfile(state, action: PayloadAction<string>) {
      state.isLoading = true;
    },
  },
});
const profileReducer = profileSlice.reducer;
export const {
  fetchProfile,
  fetchProfileSuccess,
  fetchProfileFailed,
  followProfile,
  unfollowProfile,
} = profileSlice.actions;

export default profileReducer;
