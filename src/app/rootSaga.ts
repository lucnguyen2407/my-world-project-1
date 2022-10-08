import { all } from "redux-saga/effects";
import { ArticlesSaga } from "../store/article/article.saga";
import { AuthSaga } from "../store/auth/auth.saga";
import { CommentSaga } from "../store/comment/comment.saga";
import profileSaga from "../store/profile/profileSaga";

export function* rootSaga() {
  yield all([ArticlesSaga(), AuthSaga(), CommentSaga(),profileSaga()]);
}
