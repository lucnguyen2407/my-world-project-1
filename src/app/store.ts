import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import authReducer from "../store/auth/auth.slice";
import ArticleReducer from "../store/article/article.slice";
import { rootSaga } from "./rootSaga";
import commentReducer from "../store/comment/comment.slice";
import profileReducer from "../store/profile/profileSlice";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    article: ArticleReducer,
    userAuth: authReducer,
    comment: commentReducer,
    profile: profileReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
