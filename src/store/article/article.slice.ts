import {
  articleFilter,
  createArticlesType,
  indexTypeArticles,
  indexTypeData,
  tagListType,
} from "./../../types/index.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitialArticleInterface {
  loading: boolean;
  articles: indexTypeArticles[];
  filter: {
    limit: number;
    offset: number;
  };
  tags: string[];
  articlesCount: number;
}

const initialState: InitialArticleInterface = {
  loading: false,
  articles: [],
  articlesCount: 0,
  filter: {
    limit: 0,
    offset: 0,
  },
  tags: [],
};

const ArticleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    getAllArticles: (state, action: PayloadAction<articleFilter>) => {
      state.loading = true;
    },
    // getListArticles: (state, action: PayloadAction<articleFilter>) => {
    //   state.loading = true;
    // },
    getAllArticlesSuccess: (state, action: PayloadAction<indexTypeData>) => {
      state.loading = false;
      state.articles = action.payload.articles;
      state.articlesCount = action.payload.articlesCount;
    },
    addArticle: (state, action: PayloadAction<createArticlesType>) => {
      state.loading = true;
    },
    updateArticle: (
      state,
      action: PayloadAction<{
        currentArticle: createArticlesType;
        slug: string;
      }>
    ) => {
      state.loading = true;
    },
    changeFilterTag: (state, action: PayloadAction<articleFilter>) => {
      // state.filter = action.payload;
      state.loading = true;
    },
    gettagName: () => {},
    gettagNameSuccess: (state, action: PayloadAction<tagListType>) => {
      state.tags = action.payload.tags;
    },
    deleteArticle(state, action: PayloadAction<string | undefined>) {},
  },
});
// create reducer

const ArticleReducer = ArticleSlice.reducer;

// export

export const {
  getAllArticles,
  // getListArticles,
  changeFilterTag,
  getAllArticlesSuccess,
  gettagName,
  gettagNameSuccess,
  addArticle,
  updateArticle,
  deleteArticle,
} = ArticleSlice.actions;

export default ArticleReducer;
