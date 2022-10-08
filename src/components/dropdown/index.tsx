/* eslint-disable jsx-a11y/anchor-is-valid */
/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useAppSelector } from "../../app/hooks";
import { NavLink } from "react-router-dom";
import { useAppDispatch } from "./../../app/hooks";
import { checkToken } from "./../../types/checkedToken";
import { getAllArticles } from "../../store/article/article.slice";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function MyDropdown() {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    dispatch(getAllArticles({}));
  };
  // constdispatch = useAppDispatch()

  const imgUser = useAppSelector(
    (state) => state.userAuth.userState.user.image
  );
  const Username = useAppSelector(
    (state) => state.userAuth.userState.user.username
  );
  const currentUsername = useAppSelector(
    (state) => state.userAuth.userState.user.username
  );

  return (
    <Menu as="div">
      <Menu.Button
        className=" rounded-full flex w-[40px] justify-center items-center
        bg-white  text-sm font-medium text-gray-700 
         hover:bg-gray-50focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
      >
        <img className="rounded-full w-[40px] h-auto " src={imgUser} alt="" />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-3 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <NavLink
                  to={`/profile/${currentUsername}`}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  {Username}
                </NavLink>
              )}
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  Dashboard
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <NavLink
                  to="createArticle"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  Create Post
                </NavLink>
              )}
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <NavLink
                  to="/setting"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  Settings
                </NavLink>
              )}
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <NavLink
                  to="/relevan"
                  onClick={handleLogout}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  Sign Out
                </NavLink>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
