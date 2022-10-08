import { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import ProducApi from "../../api/Product.api";
import {
  articleFilter,
  createArticlesType,
  indexTypeData,
  tagListType,
} from "../../types/index.type";
import {
  addArticle,
  changeFilterTag,
  deleteArticle,
  getAllArticles,
  getAllArticlesSuccess,
  gettagName,
  gettagNameSuccess,
  updateArticle,
} from "./article.slice";

function* handleGetAllArticles(action: PayloadAction<articleFilter>) {
  try {
    const res: indexTypeData = yield ProducApi.getProducts(action.payload);
    yield put(getAllArticlesSuccess(res));
  } catch (error) {}
}
function* handleFilterTag(action: PayloadAction<articleFilter>) {
  try {
    const res: indexTypeData = yield ProducApi.getProducts(action.payload);

    yield put(getAllArticlesSuccess(res));
  } catch (error) {}
}

function* handleAddArticles(action: PayloadAction<createArticlesType>) {
  try {
    yield ProducApi.addArticle(action.payload);
    const res: indexTypeData = yield ProducApi.getProducts({});
    yield put(getAllArticlesSuccess(res));
    toast.success("Post article Success");
    console.log(res);
  } catch (errors) {
    toast.error("Post article error");
  }
}
function* handleUpdateArticles(
  action: PayloadAction<{
    currentArticle: createArticlesType;
    slug: string;
  }>
) {
  try {
    yield ProducApi.updataArticle(
      action.payload.currentArticle,
      action.payload.slug
    );
    const res: indexTypeData = yield ProducApi.getProducts({});
    yield put(getAllArticlesSuccess(res));
    toast.success("Post article Success");
    console.log(res);
  } catch (errors) {
    toast.error("Update article error");
  }
}

function* handleTagName() {
  try {
    const res: tagListType = yield ProducApi.getTagList();

    yield put(gettagNameSuccess(res));
  } catch (error) {}
}
export function* deleteArticleSuccess(action: PayloadAction<string>) {
  yield call(ProducApi.deleteArticle, action.payload);
}
export function* ArticlesSaga() {
  yield takeLatest(getAllArticles.type, handleGetAllArticles);
  yield takeLatest(addArticle.type, handleAddArticles);
  yield takeLatest(updateArticle.type, handleUpdateArticles);
  yield takeLatest(gettagName.type, handleTagName);
  yield takeLatest(changeFilterTag.type, handleFilterTag);
  yield takeLatest(deleteArticle.type, deleteArticleSuccess);
}
