import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { commentApi } from "../../api/comment.api";
import { CommentsListRes, CommentsListType } from "../../types/index.type";
import {
  addComment,
  deleteComment,
  getListComment,
  setListComment,
} from "./comment.slice";

export function* ListComment(action: PayloadAction<string>) {
  const res: CommentsListRes = yield call(
    commentApi.getCommentByArticle,
    action.payload
  );
  yield put(setListComment(res.comments));
}
export function* addCommentSuccess(action: PayloadAction<any>) {
  yield console.log("action comment", action.payload);
  const res: CommentsListType = yield commentApi.addComment(
    action.payload.bodyReq,
    action.payload.slug
  );
  yield put(getListComment(action.payload.slug));
}
export function* deleteCommentSuccess(
  action: PayloadAction<{ id: string; slug: string }>
) {
  yield console.log("action delete", action.payload);
  const res: CommentsListType = yield commentApi.deleteComment(
    action.payload.id,
    action.payload.slug
  );
  yield put(getListComment(action.payload.slug));
}

export function* CommentSaga() {
  yield takeLatest(getListComment.type, ListComment);
  yield takeLatest(addComment.type, addCommentSuccess);
  yield takeLatest(deleteComment.type, deleteCommentSuccess);
}
