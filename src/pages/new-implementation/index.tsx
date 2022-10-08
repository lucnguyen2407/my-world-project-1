/* eslint-disable jsx-a11y/anchor-is-valid */
import { Menu, Transition } from "@headlessui/react";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import {
  deleteArticle,
  getAllArticles,
} from "../../store/article/article.slice";
import {
  deleteComment,
  getListComment,
} from "../../store/comment/comment.slice";
import {
  fetchProfile,
  followProfile,
  unfollowProfile,
} from "../../store/profile/profileSlice";
import { CommentsListType, indexTypeArticles } from "../../types/index.type";
import { Comment } from "./addComment/index";

import "./newimp.style.scss";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function NewImpPage() {
  const navigate = useNavigate();
  const profileCurrent = useAppSelector(
    (state: RootState) => state.profile.currentProfile.profile
  );
  const handleUnFollow = () => {
    dispatch(unfollowProfile(profileCurrent.username));
  };
  const handleFollow = () => {
    dispatch(followProfile(profileCurrent.username));
  };

  const currentUser = useAppSelector(
    (state) => state.userAuth.userState.user.username
  );
  const isLogged = useAppSelector((state) => state.userAuth.isLoginSuccess);
  const DataArtical = useAppSelector((state) => state.article.articles);
  // console.log("dataArtical: " + DataArtical);
  const dispatch = useDispatch();
  const commentsList: CommentsListType[] = useSelector(
    (state: RootState) => state.comment.commentList
  );
  const Params = useParams<{ slug: string }>();
  const User: indexTypeArticles | undefined = DataArtical.find(
    (User) => User.slug === Params.slug
  );
  // console.log(User);

  const slug: string | undefined = Params.slug;

  React.useEffect(() => {
    if (User) {
      dispatch(fetchProfile((User as any).author.username));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  React.useEffect(() => {
    dispatch(getListComment(Params.slug));
  }, []);
  const handleDeleteComment = (id: string) => {
    dispatch(deleteComment({ id, slug }));
  };
  const handleDeleteArticle = () => {
    dispatch(deleteArticle(slug));
    navigate("/");
    dispatch(getAllArticles({}));
  };
  // console.log("username: ", currentUser);
  // console.log("username: ", profileCurrent.username);
  return (
    <div className="imp-page-container ">
      <div className="container author-main mt-32 grid grid-cols-5 gap-4 mx-auto">
        <div className="imp-page-left container mx-auto mb-10 drop-shadow-lg ">
          <div className="text-center py-5">
            <div>
              <button className="duration-100 px-5 py-2 text-lg rounded-lg border-solid border-2 border-transparent hover:border-indigo-600 author-button text-black">
                <i className="fas fa-heart text-red-600"></i>
              </button>
              <p>{User?.favoritesCount}</p>
            </div>
            <div>
              <button className="duration-100 px-5 py-2 text-lg rounded-lg border-solid border-2 border-transparent hover:border-indigo-600 author-button text-black">
                <i className="fas fa-industry"></i>
              </button>
              <p>1</p>
            </div>
            <div>
              <button className="duration-100 px-5 py-2 text-lg rounded-lg border-solid border-2 border-transparent hover:border-indigo-600 author-button text-black">
                <i className="far fa-bookmark"></i>
              </button>
              <p>1</p>
            </div>
          </div>
        </div>
        <div className="imp-page-center container mx-auto bg-white rounded-lg  drop-shadow-lg col-span-3 ">
          <div>
            <div className="imp-page-background rounded-t-lg"></div>
            <div className="imp-page-main">
              <h1 className="mt-10 px-14 mb-3">{User?.title}</h1>
              <div className="px-14">
                {User?.tagList.map((data, index) => (
                  <a key={index} className="c-btn" href="/">
                    #{data}
                  </a>
                ))}
              </div>
              <div className="imp-page-box mb-5">
                <p>{User?.body}</p>
              </div>
            </div>
          </div>
          <div className="imp-comment">
            <div className="flex justify-between">
              <h1 className="">Comments ({commentsList.length})</h1>
              <button className="duration-100 px-5 py-2 text-lg rounded-lg border border-indigo-400 bg-white text-blue-400 hover:bg-blue-100 author-button">
                Subscribe
              </button>
            </div>
            <div>
              <Comment slug={Params.slug} />
            </div>
            {commentsList.map((data, index) => {
              const date = new Date(data.createdAt).toDateString();
              const id = data.id.toString();
              return (
                <div
                  key={index}
                  className="imp-comment-list grid grid-cols-5 mt-5"
                >
                  <div>
                    <img
                      className="rounded-full mx-auto "
                      src={data.author.image}
                      alt="Cat"
                      style={{ width: "50px", height: "50px" }}
                    />
                  </div>
                  <div className="col-span-4">
                    <div className="css-1 ">
                      <div className="css-2">
                        <div className="flex justify-between px-1 pt-2">
                          <div>
                            <button className="duration-100 px-5 py-2 text-sm rounded-lg bg-white text-black hover:bg-blue-100 author-button">
                              <strong>{data.author.username}</strong>
                            </button>
                            <time
                              dateTime="2022-09-19T21:04:49Z"
                              title="Tuesday, September 20, 2022 at 4:04:49 AM"
                            >
                              {date}
                            </time>
                          </div>
                          <div className="drop-down-delete">
                            <Menu as="div">
                              <Menu.Button className="duration-100 px-5 py-2 text rounded-lg bg-white text-black hover:bg-blue-100 author-button">
                                <i className="fas fa-ellipsis-h"></i>
                              </Menu.Button>

                              <Transition
                                as={React.Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                              >
                                <Menu.Items className="absolute right-3 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                  <div className="py-1">
                                    {currentUser === data.author.username ? (
                                      <Menu.Item>
                                        {({ active }) => (
                                          <a
                                            onClick={() =>
                                              handleDeleteComment(id)
                                            }
                                            className={classNames(
                                              active
                                                ? "bg-gray-100 text-gray-900 cursor-pointer"
                                                : "text-gray-700",
                                              "block px-4 py-2 text-sm"
                                            )}
                                          >
                                            Delete
                                          </a>
                                        )}
                                      </Menu.Item>
                                    ) : null}
                                    <Menu.Item>
                                      {({ active }) => (
                                        <a
                                          href="#"
                                          className={classNames(
                                            active
                                              ? "bg-gray-100 text-gray-900"
                                              : "text-gray-700",
                                            "block px-4 py-2 text-sm"
                                          )}
                                        >
                                          Copy Link
                                        </a>
                                      )}
                                    </Menu.Item>
                                    <Menu.Item>
                                      {({ active }) => (
                                        <a
                                          href="#"
                                          className={classNames(
                                            active
                                              ? "bg-gray-100 text-gray-900"
                                              : "text-gray-700",
                                            "block px-4 py-2 text-sm"
                                          )}
                                        >
                                          Report Abuse
                                        </a>
                                      )}
                                    </Menu.Item>
                                  </div>
                                </Menu.Items>
                              </Transition>
                            </Menu>
                          </div>
                        </div>
                        <p className="px-5 pb-2">{data.body}</p>
                      </div>
                    </div>
                    <div>
                      <button className="duration-100 px-5 py-2 text-lg rounded-lg border-indigo-400 bg-white hover:bg-blue-100 author-button">
                        <i className="fas fa-heart text-red-500"></i>{" "}
                        <span>0 LIKE</span>
                      </button>
                      <button className="duration-100 px-5 py-2 text-lg rounded-lg border-indigo-400 bg-white hover:bg-blue-100 author-button">
                        <i className="far fa-comment"></i> <span>0 REPLY</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="imp-page-right container mx-auto bg-white rounded-lg drop-shadow-lg ">
          <div className="imp-user-background rounded-t-lg"></div>
          <div className="imp-user-detail">
            <div className="imp-user-detail-avatar">
              <img
                className="rounded-full "
                src={User?.author.image}
                alt="Cat"
                style={{ width: "40px", height: "40px" }}
              />
            </div>
            <p className="imp-user-detail-name mb-2">
              <strong>{User?.author.username}</strong>
            </p>
            {profileCurrent.username === currentUser && isLogged ? (
              <div className="flex flex-col gap-3">
                <button
                  className="duration-100 shadow-md w-[200px] py-3  text-lg rounded-lg bg-blue-500 text-white hover:bg-blue-400 author-button "
                  onClick={() => navigate("/editArticle/" + slug)}
                >
                  Edit this article
                </button>
                <button
                  className="duration-100 shadow-md w-[200px] py-3  text-lg rounded-lg bg-red-500 text-white hover:bg-red-400 author-button "
                  onClick={() => handleDeleteArticle()}
                >
                  Delete this article
                </button>
              </div>
            ) : (
              <button
                className="duration-100 shadow-md w-[200px] py-3 mt-6 text-lg rounded-lg bg-blue-500 text-white hover:bg-blue-400 author-button "
                onClick={() => {
                  profileCurrent.following ? handleUnFollow() : handleFollow();
                }}
              >
                {profileCurrent.following === false ? "Follow" : "Unfollow"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
