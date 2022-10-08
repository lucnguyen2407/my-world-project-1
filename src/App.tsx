import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import Relevant from "./components/container/Relevant";
import NavBar from "./components/Navbar";
import PageContent from "./components/Page.content";
import NewImpPage from "./pages/new-implementation";
import CreateAccount from "./pages/Tungcs_createaccount/create";
import Login from "./pages/Tungcs_login/login";

import { ToastContainer } from "react-toastify";
import CreateActicle from "./pages/createArticle/createArticle";
import Notification from "./pages/notifications/notifications";

import {
  getAllArticles,
  getAllArticlesSuccess,
  gettagName,
} from "./store/article/article.slice";
import { checkToken } from "./types/checkedToken";
import { getCurrentUser, login } from "./store/auth/auth.slice";

import SettingPage from "./pages/setting";
import ProfilePage from "./pages/profile-page";

import EditActicle from "./pages/editArticle";
import Footer from "./components/Footer/Footer";

function App() {
  const token = checkToken();
  // console.log("token:", token);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (token) {
      dispatch(gettagName());
      dispatch(getCurrentUser());
      dispatch(getAllArticles({}));
    } else {
      // dispatch(gettagName());
      // dispatch(getCurrentUser());
      dispatch(getAllArticles({}));
    }
  }, []);

  const articlesUsers = useAppSelector((state) => state.article.articles);
  // console.log("articlesUsers:", articlesUsers);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route path="/" element={<PageContent />}>
            <Route path="/" element={<Navigate to="relevan" />} />
            <Route path="latest" element={<Relevant />} />
            <Route path="top" element={<Relevant />} />
            <Route path="relevan" element={<Relevant />} />
          </Route>
          <Route path="article/:slug" element={<NewImpPage />} />
          <Route path="profile/:username" element={<ProfilePage />} />
          <Route path="account" element={<CreateAccount />} />
          <Route path="login" element={<Login />} />
          <Route path="createArticle" element={<CreateActicle />} />
          <Route path="editArticle/:slug" element={<EditActicle />} />
          <Route path="notification" element={<Notification />} />
          <Route path="setting" element={<SettingPage />} />
        </Route>
      </Routes>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* <LoginHtml /> */}
      {/* <UserProfile /> */}
    </div>
  );
}

export default App;
