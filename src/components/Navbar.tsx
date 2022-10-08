import { NavLink, Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import MyDropdown from "./dropdown";
// import Example from "./dropdown";

import { useEffect } from "react";
import { logout } from "../store/auth/auth.slice";
import { useAppDispatch } from "./../app/hooks";
import { checkToken } from "./../types/checkedToken";
import Footer from "./Footer/Footer";

export interface INavBarProps {}

export default function NavBar(props: INavBarProps) {
  const dataUser = useAppSelector(
    (state) => state.userAuth.userState.user.image
  );
  console.log(dataUser);
  const dispatch = useAppDispatch();

  const token = checkToken();

  useEffect(() => {
    if (!token) {
      dispatch(logout());
    }
  }, [token, dispatch]);

  return (
    <>
      <div className=" default-header crayons-header ">
        <div className="flex items-center navBar_default gap-5 ">
          <div className="flex justify-center items-center">
            <a className="inline-block" href="/relevan">
              <img
                className="h-[46px] w-[100px] object-cover rounded-lg"
                src="https://dev-to-uploads.s3.amazonaws.com/uploads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png"
                alt=""
              />
            </a>
          </div>
          <div className="w-full  ">
            <form
              method="get"
              action="/search"
              role="search"
              acceptCharset="UTF-8"
            >
              <div className="relative  md:max-w-[420px] w-full h-[46px] outline-none ">
                <input
                  className=" Navbar_search-input w-full h-full p-3  "
                  type="text"
                  placeholder="Search..."
                  autoComplete="off"
                  aria-label="Search term"
                />
                <button
                  type="submit"
                  aria-label="Search"
                  className="absolute inset-px left-auto px-3 text-2xl c-btn-search"
                >
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </form>
          </div>

          {token ? (
            <div className="flex items-center h-[46px] gap-5">
              <NavLink
                to="createArticle"
                className="whitespace-nowrap border p-2 rounded-lg CreateAccount_style hidden md:block "
                data-no-instant
              >
                Create Post
              </NavLink>
              <NavLink
                to="notification"
                className="whitespace-nowrap w-auto py-1 text-2xl bg-slate-300  Login_style hidden md:block"
                data-no-instant
              >
                <i className="fas fa-bell"></i>
              </NavLink>
              <MyDropdown />
            </div>
          ) : (
            <div className="flex items-center h-[46px] gap-1 sm:gap-8 ">
              <NavLink
                to="login"
                className="whitespace-nowrap p-2 rounded-lg Login_style"
                data-no-instant
              >
                Log in
              </NavLink>

              <NavLink
                to="account"
                className="whitespace-nowrap border p-2 rounded-lg CreateAccount_style "
                data-no-instant
              >
                Create account
              </NavLink>
            </div>
          )}
        </div>
      </div>
      {/* <PageContent /> */}

      <Outlet />
    </>
  );
}
