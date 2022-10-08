/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import { useDispatch } from "react-redux";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import {
  fetchProfile,
  followProfile,
  unfollowProfile,
} from "../../store/profile/profileSlice";
import { indexTypeArticles, profileDataType } from "../../types/index.type";
import "./profile.style.scss";
interface ProfileProps {
  profileCurrent: profileDataType;
  articleByUser: indexTypeArticles[];
  handleLoadFavorited: () => void;
  handleLoadAllPost: () => void;
  handleDeleteArticle: (slug: string) => void;
}

export default function Profile({
  articleByUser,
  profileCurrent,
  handleLoadFavorited,
  handleLoadAllPost,
  handleDeleteArticle,
}: ProfileProps) {
  const dispatch = useDispatch();
  const DataArtical = useAppSelector((state) => state.article.articles);
  const Params = useParams<{ username: string }>();
  const User: indexTypeArticles | undefined = DataArtical.find(
    (User) => User.author.username === Params.username
  );
  const usernameAuth = useAppSelector(
    (state) => state.userAuth.userState.user.username
  );
  const handleUnFollow = () => {
    dispatch(unfollowProfile(profileCurrent.profile.username));
  };
  const handleFollow = () => {
    dispatch(followProfile(profileCurrent.profile.username));
  };
  const handleCloseSubmit = (slug: string) => {
    handleDeleteArticle(slug);
  };
  const navigate = useNavigate();
  // const profileCurrent = useAppSelector(
  //   (state: RootState) => state.profile.currentProfile
  // );
  // React.useEffect(() => {
  //   dispatch(fetchProfile(Params.username));
  // }, []);
  // console.log(User);
  // console.log(Params);
  // console.log(profileCurrent);

  return (
    <div>
      <div className="author-header">
        <div className="author-background"></div>
        <img
          className="mx-auto rounded-full author-image"
          src={profileCurrent.profile.image}
          alt="Cat"
          style={{ width: "110px", height: "110px" }}
        />
        <div className="container mx-auto bg-white rounded-lg author-container mt-14 drop-shadow-lg">
          <div className="">
            <div className="text-center py-5">
              <h1 className="pb-5 mt-14">{profileCurrent.profile.username}</h1>
              <p className="pb-5">
                {profileCurrent.profile.bio
                  ? profileCurrent.profile.bio
                  : "404 profile not found"}
              </p>
              <p>
                <i className="fas fa-birthday-cake"></i> 3 march 2022
              </p>
              {profileCurrent.profile.username === usernameAuth ? (
                <Link to="/setting">
                  <button
                    className="duration-100 shadow-md  px-5 py-2 text-lg rounded-lg   
  bg-blue-500 text-white hover:bg-blue-400 author-button"
                  >
                    Edit Profile
                  </button>
                </Link>
              ) : (
                <button
                  className="duration-100 shadow-md  px-5 py-2 text-lg rounded-lg   
  bg-blue-500 text-white hover:bg-blue-400 author-button"
                  onClick={() => {
                    profileCurrent.profile.following
                      ? handleUnFollow()
                      : handleFollow();
                  }}
                >
                  {profileCurrent.profile.following ? "Unfollow" : "Follow"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="author-main mt-32  grid grid-cols-3 gap-4 mx-auto">
        <div className="author-main-1 sidebar-left   drop-shadow-lg  rounded-lg bg-white ">
          <div className="flex  flex-col  p-7 text-2xl gap-3">
            <button className="text-left c-btn " onClick={handleLoadAllPost}>
              <span className=" p-2 ">
                <i className="fas fa-file-alt"></i> My articles
              </span>
            </button>
            <button className="text-left c-btn " onClick={handleLoadFavorited}>
              <span className=" p-2">
                <i className="fas fa-heart"></i> Favorited
              </span>
            </button>
            <button className="text-left c-btn">
              <span className=" p-2">
                <i className="fas fa-comment-dots"></i> comments written
              </span>
            </button>
            <button className="text-left c-btn">
              <span className=" p-2">
                <i className="fas fa-hashtag"></i> tags followed
              </span>
            </button>
          </div>
        </div>
        <div className="author-main-2 container mx-auto  drop-shadow-lg col-span-2">
          {articleByUser.map((data, index) => {
            const date = new Date(data.createdAt).toDateString();
            return (
              <div
                key={index}
                className="text-center py-5 mb-8  rounded-lg bg-white"
              >
                <div className="user-list">
                  <div className="ml-5 mr-5 css-1 bg-[#fafafa] rounded-lg">
                    <div className="articles_detail ">
                      <div className="articles_author-pic mr-3">
                        <a
                          href="/gregorygaines"
                          className="crayons-avatar  crayons-avatar--l  "
                        >
                          <img
                            src={data.author.image}
                            alt="gregorygaines profile"
                            className="rounded-full w-12 "
                            loading="lazy"
                          />
                        </a>
                      </div>
                      <div>
                        <div className="c-btn">
                          <a
                            href="/gregorygaines"
                            className="text-lg font-medium"
                          >
                            {data.author.username}
                          </a>
                        </div>
                        <a href="/" className="">
                          <time
                            dateTime="2022-09-19T21:04:49Z"
                            title="Tuesday, September 20, 2022 at 4:04:49 AM"
                          >
                            {date}
                          </time>
                        </a>
                      </div>
                    </div>
                    <div className="pt-2">
                      <h2 className="">
                        <NavLink to={`/article/${data.slug}`}>
                          {data.title}
                        </NavLink>
                      </h2>
                      <div className=" m-2 flex gap-3 items-center">
                        {data.tagList.length > 0
                          ? data.tagList.map((tag, index) => (
                              <a key={index} className="c-btn" href="/">
                                {`#${tag}`}
                              </a>
                            ))
                          : ""}
                      </div>
                      <div className="flex justify-between mt-5 ">
                        <div className="flex gap-5 ">
                          <button>
                            <span className="c-btn p-2">
                              <i className="fas fa-heart text-red-600"></i>{" "}
                              {data.favoritesCount} Like
                            </span>
                          </button>
                          <button
                            onClick={() => navigate(`/article/${data.slug}`)}
                          >
                            <span className="c-btn p-2">
                              <i className="fas fa-comment-medical"></i>
                              <small className=""> Add comments</small>
                            </span>
                          </button>
                        </div>
                        <div className="">
                          <button onClick={() => handleCloseSubmit(data.slug)}>
                            <span className="c-btn p-2">
                              <i className="fas fa-trash"></i>
                              <small className=""> Remove</small>
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
