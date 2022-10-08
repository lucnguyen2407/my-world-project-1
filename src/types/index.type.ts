import * as React from "react";
export interface indexTypeArticles {
  author: {
    username: string;
    bio: null;
    image: string;
  };
  body: string;
  createdAt: string;
  description: string;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  tagList: string[];
  title: string;
  updatedAt: string;
}

export interface indexTypeData {
  articles: indexTypeArticles[];
  filter: {
    limit: number;
    offset: number;
  };
  tags: string[];
  articlesCount: number;
}
export interface tagListType {
  tags: string[];
}

export interface userLoginTypeData {
  user: {
    email: string;
    password: string;
  };
}
export interface createAccountTypeData {
  user: {
    username: string;
    email: string;
    password: string;
  };
}
export interface userUpdateTypeData {
  user: {
    email: string;
    bio: string;
    image: string;
  };
}

export interface userStateType {
  user: {
    email: string;
    bio: string;
    image: string;
    token: string;
    username: string;
  };
}
export interface createArticlesType {
  article: {
    title: string;
    description: string;
    body: string;
    tagList?: string[];
  };
}
export interface updateArticlesType {
  article: {
    title: string;
  };
}
export interface addCommentsType {
  comment: {
    body: string;
  };
}

export interface CommentsListType {
  id: number;
  createdAt: string;
  updatedAt: string;
  body: string;
  author: {
    username: string;
    bio: null;
    image: string;
    following: boolean;
  };
}

export interface CommentsListRes {
  comments: CommentsListType[];
}
export interface addCommentsParam {
  commentData: addCommentsType;
  slug: string;
}

export interface userDataUpdateType {
  user: {
    email: string;
    bio: string;
    image: string;
    password: string;
    username: string;
  };
}

export interface articleFilter {
  limit?: number;
  offset?: number;
  tag?: string;
  author?: string;
  favorited?: string;
}
export interface profileDataType {
  profile: {
    username: string;
    image: string;
    bio: string;
    following: boolean;
  };
}
