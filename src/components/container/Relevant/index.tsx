/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import * as React from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import { v4 as uuidv4 } from "uuid";
// import { Pagination } from "@mui/material";
import {
  articleFilter,
  CommentsListType,
  indexTypeArticles,
} from "../../../types/index.type";
import { useAppDispatch } from "./../../../app/hooks";

import ProducApi from "../../../api/Product.api";
import { Pagination } from "@mui/material";
import { getAllArticles } from "../../../store/article/article.slice";

export interface IRelevantProps {
  articleList: indexTypeArticles[];
}
interface typeFavorite {
  isFavorited: Boolean;
  favoriteCount: number;
}
const getFavoriteList = (articleList: indexTypeArticles[]) => {
  return articleList.map((data) => {
    return {
      isFavorited: data.favorited,
      favoriteCount: data.favoritesCount,
    };
  });
};

export default function Relevant() {
  // const NiceRandomLike = Math.floor(Math.random() * 1000);
  const NiceRandomMark = Math.floor(Math.random() * 10);
  const DataArtical = useAppSelector((state) => state.article.articles);
  const totalArticle = useAppSelector((state) => state.article.articlesCount);
  const [currentPage, setCurentPage] = React.useState<number>(0);
  const [tagValue, setTagValue] = React.useState("2");

  const dispatch = useAppDispatch();
  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurentPage(value);
  };

  React.useEffect(() => {
    if (currentPage > 0) {
      const pagination: articleFilter = {
        limit: 3,
        offset: (currentPage - 1) * 3,
      };
      console.log(pagination);
      console.log(currentPage);
      dispatch(getAllArticles(pagination));
    }
  }, [currentPage, dispatch]);

  const [listFavorite, setListFavorite] = React.useState<typeFavorite[]>(
    getFavoriteList(DataArtical)
  );
  const isLogged = useAppSelector((state) => state.userAuth.isLoginSuccess);

  const handleClickFavorite = async (slug: string, index: number) => {
    try {
      const newList = listFavorite.map((value, index2) => {
        if (index2 === index) {
          return {
            favoriteCount: value.favoriteCount + 1,
            isFavorited: !value.isFavorited,
          };
        }
        return value;
      });
      setListFavorite(newList);
      await ProducApi.favoriteArticle(slug);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnFavorite = async (slug: string, index: number) => {
    try {
      const newList = listFavorite.map((value, index2) => {
        if (index2 === index) {
          return {
            favoriteCount: value.favoriteCount - 1,
            isFavorited: !value.isFavorited,
          };
        }
        return value;
      });
      setListFavorite(newList);
      await ProducApi.unfavoriteArticle(slug);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <div className="">
        <a
          href="/gregorygaines/stop-using-env-files-now-kp0"
          title="Stop Using .env Files Now!"
          aria-label="article"
          className="crayons-article__cover__image__feed crayons-story__cover__image"
        >
          <img
            src="https://res.cloudinary.com/practicaldev/image/fetch/s--Rz3PFPfI--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/j2aieddggukro3liwso9.png"
            style={{ backgroundColor: "#dddddd" }}
            className="w-full, h-full, object-scale-down"
            alt="Cover image for Stop Using .env Files Now!"
          />
        </a>
      </div>
      {DataArtical.map((artical, index) => {
        const date = new Date(artical.createdAt).toDateString();
        return (
          <div
            key={uuidv4()}
            className="p-5 mb-4 shadow-lg  bg-[#fafafa] rounded-lg"
          >
            <div className="articles_detail ">
              <div className="articles_author-pic mr-3">
                <NavLink
                  to={`/profile/${artical.author.username}`}
                  className=""
                >
                  <img
                    src={artical.author.image}
                    alt={`${artical.author.username} profile`}
                    className="rounded-full w-12 "
                  />
                </NavLink>
              </div>
              <div>
                <div className="c-btn" style={{ inlineSize: "fit-content" }}>
                  <NavLink
                    to={`/profile/${artical.author.username}`}
                    className="text-lg font-medium"
                  >
                    {artical.author.username}
                  </NavLink>
                </div>
                <NavLink
                  to={`/profile/${artical.author.username}`}
                  className=""
                >
                  <time
                    dateTime={artical.createdAt}
                    title="Tuesday, September 20, 2022 at 4:04:49 AM"
                  >
                    {date}
                  </time>
                </NavLink>
              </div>
            </div>
            <div className="pt-2">
              <h2 className="">
                <NavLink to={`/article/${artical.slug}`}>
                  {artical.title}
                </NavLink>
              </h2>
              <div className=" m-2 flex gap-3 items-center">
                {artical.tagList.length > 0
                  ? artical.tagList.map((tag) => (
                      <a key={uuidv4()} className="c-btn cursor-pointer">
                        {`#${tag}`}
                      </a>
                    ))
                  : ""}
              </div>
              <div className="ml-2">
                <p>{artical.body}</p>
              </div>
              <div className="flex justify-between mt-5 ">
                <div className="flex gap-5 ">
                  {isLogged ? (
                    <button
                      onClick={() => {
                        listFavorite[index].isFavorited
                          ? handleUnFavorite(artical.slug, index)
                          : handleClickFavorite(artical.slug, index);
                      }}
                    >
                      <span className="c-btn p-2">
                        <i
                          className={
                            listFavorite[index].isFavorited
                              ? "fas fa-heart text-red-600"
                              : "fas fa-heart "
                          }
                        ></i>{" "}
                        {listFavorite[index].favoriteCount} Like
                      </span>
                    </button>
                  ) : null}
                  <NavLink
                    to={`/article/${artical.slug}`}
                    className="c-btn"
                    aria-label="Add a comment to post - Stop Using .env Files Now!"
                  >
                    <i className="fas fa-comment-medical"></i>
                    {/* {commentsList.length} */}
                    <span className="">&nbsp;Add comments</span>
                  </NavLink>
                </div>
                <div className="">
                  <small className="">{NiceRandomMark} min read</small>
                  <button>
                    <span className="c-btn p-3 ">
                      <i className="far fa-bookmark"></i>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <Pagination
        page={currentPage}
        count={Math.ceil(totalArticle / 3)}
        onChange={handleChangePage}
        color="primary"
        variant="outlined"
        shape="rounded"
      />
    </div>
  );
}
