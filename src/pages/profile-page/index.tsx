/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProducApi from "../../api/Product.api";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { getAllArticles } from "../../store/article/article.slice";
import { fetchProfile } from "../../store/profile/profileSlice";
import { articleFilter } from "../../types/index.type";
import Profile from "../profile";
export interface IAppProps {}

export default function ProfilePage(props: IAppProps) {
  const dispatch = useAppDispatch();
  const profileCurrent = useAppSelector(
    (state: RootState) => state.profile.currentProfile
  );
  console.log("profileCurrent", profileCurrent);

  const articleByUser = useAppSelector(
    (state: RootState) => state.article.articles
  );
  const location = useLocation();
  const userName = location.pathname.split("/")[2];
  const [filter, setFilter] = useState<articleFilter>({
    limit: 10,
    offset: 0,
    author: userName,
  });
  const handleDeleteArticle = async (slug: string) => {
    try {
      await ProducApi.deleteArticle(slug);
      dispatch(getAllArticles({ ...filter }));
    } catch (error) {
      console.log("delete article failed", error);
    }
  };
  useEffect(() => {
    dispatch(fetchProfile(userName));
    dispatch(getAllArticles(filter));
  }, [dispatch, filter, location]);
  const handleLoadFavorited = () => {
    setFilter({
      limit: 10,
      offset: 0,
      favorited: userName,
    });
  };
  const handleLoadAllPost = () => {
    setFilter({
      limit: 10,
      offset: 0,
      author: userName,
    });
  };
  return (
    <Profile
      profileCurrent={profileCurrent}
      articleByUser={articleByUser}
      handleLoadFavorited={handleLoadFavorited}
      handleLoadAllPost={handleLoadAllPost}
      handleDeleteArticle={handleDeleteArticle}
    />
  );
}
