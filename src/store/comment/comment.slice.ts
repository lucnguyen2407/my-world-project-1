import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addCommentsParam,
  addCommentsType,
  CommentsListType,
} from "../../types/index.type";

interface commentState {
  isLoading?: boolean;
  commentList: CommentsListType[];
}

const initialState: commentState = {
  isLoading: false,
  commentList: [],
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    getListComment(state, action: PayloadAction<string | undefined>) {
      state.isLoading = true;
    },
    setListComment(state, action: PayloadAction<CommentsListType[]>) {
      state.isLoading = false;
      state.commentList = action.payload;
    },
    addComment(state, action: PayloadAction<any>) {},
    deleteComment(
      state,
      action: PayloadAction<{ id: string; slug: string | undefined }>
    ) {},
  },
});
const commentReducer = commentSlice.reducer;
export const { getListComment, setListComment, addComment, deleteComment } =
  commentSlice.actions;

export default commentReducer;
