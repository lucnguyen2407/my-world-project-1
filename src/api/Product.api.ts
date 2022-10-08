import {
  createArticlesType,
  indexTypeArticles,
  indexTypeData,
  tagListType,
} from "../types/index.type";
import axiosInstance from "./index";
import { articleFilter } from "./../types/index.type";
import { stringify } from "query-string";

const ProducApi = {
  addArticle: (addAcount: createArticlesType): Promise<indexTypeArticles> => {
    return axiosInstance.post("articles", addAcount);
  },
  getProducts: (filterAll: articleFilter): Promise<indexTypeData> => {
    const filterAllString = stringify(filterAll);
    const requestUrl = `/articles?${filterAllString}`;
    return axiosInstance.get(requestUrl);
  },

  getTagList: (): Promise<tagListType> => {
    return axiosInstance.get("tags");
  },
  updataArticle(
    DataArticle: createArticlesType,
    slug: string
  ): Promise<indexTypeArticles> {
    const url = `/articles/${slug}`;
    return axiosInstance.put(url, DataArticle);
  },
  deleteArticle(slug: string): Promise<indexTypeArticles> {
    const url = `/articles/${slug}`;
    return axiosInstance.delete(url);
  },
  favoriteArticle(slug: string): Promise<any> {
    const url = `/articles/${slug}/favorite`;
    return axiosInstance.post(url);
  },

  unfavoriteArticle(slug: string): Promise<any> {
    const url = `/articles/${slug}/favorite`;
    return axiosInstance.delete(url);
  },
};

export default ProducApi;
