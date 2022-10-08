/* eslint-disable jsx-a11y/anchor-is-valid */
import { Field, Form, Formik } from "formik";
import * as React from "react";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateUserProfile } from "../../store/auth/auth.slice";
import { userDataUpdateType } from "../../types/index.type";
import { useNavigate } from "react-router-dom";
import { getAllArticles } from "../../store/article/article.slice";

export interface ISettingPageProps {}
const Schema = yup.object({
  email: yup
    .string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required"),
  password: yup.string().max(255).required("Password is required"),
});

export interface updateUserProfile {
  email: string;
  bio: string;
  image: string;
  password: string;
  username: string;
}
export default function SettingPage(props: ISettingPageProps) {
  const currentUser = useAppSelector((state) => state.userAuth.userState.user);
  const dispatch = useAppDispatch();
  const currentUserName = currentUser.username;
  const currentUserEmail = currentUser.email;
  const currentUserImg = currentUser.image;
  const currentUserbio = currentUser.bio;
  const navigate = useNavigate();
  const onSubmit = (values: updateUserProfile) => {
    const formValues: userDataUpdateType = {
      user: {
        email: values.email,
        bio: values.bio,
        image: values.image,
        password: values.password,
        username: values.username,
      },
    };
    dispatch(updateUserProfile(formValues));
    dispatch(getAllArticles({}));
    navigate("/relevan");
    console.log(formValues);
  };

  return (
    <div>
      <div className="setting-page  container mt-16 mx-auto ">
        <h2 className="mb-5">
          Settings for{" "}
          <span className="text-blue-600">{currentUser.username}</span>
        </h2>
        <div className="setting-page-content container grid grid-cols-4 gap-4">
          <div className="bg-white border rounded-lg h-96">
            {" "}
            <nav className="mb-4 mt-4">
              <ul className="ml-5 mr-5">
                <li className="default-navigations">
                  <a href="#" className="">
                    <i className="fas fa-smile mr-3 text-[#a68025]"></i>
                    Profile
                  </a>
                </li>
                <li className="default-navigations">
                  <a href="/" className="">
                    <i className="fas fa-clipboard-list mr-3 text-[#c9c634]"></i>
                    Customization
                  </a>
                </li>
                <li className="default-navigations">
                  <a href="/" className="">
                    <i className="fas fa-microphone mr-3 text-[#7e7e7e]"></i>
                    Account
                  </a>
                </li>
                <li className="default-navigations">
                  <a href="/" className="">
                    <i className="fas fa-video mr-3 text-[#7b5a5a]"></i>
                    Billing
                  </a>
                </li>
                <li className="default-navigations">
                  <a href="/" className="">
                    <i className="fas fa-tags mr-3 text-[#5e3794]"></i>
                    Organization
                  </a>
                </li>
                <li className="default-navigations">
                  <a href="/" className="">
                    <i className="fas fa-lightbulb mr-3 text-[#aebd36]"></i>
                    Extensions
                  </a>
                </li>
                <li className="default-navigations">
                  <a href="/" className="">
                    <i className="fas fa-shopping-bag mr-3 text-[#a62525]"></i>
                    Forem Shop
                  </a>
                </li>
                <li className="default-navigations">
                  <a href="/" className="">
                    <i className="fas fa-heart mr-3 text-[#ea4545]"></i>
                    Sponsors
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="col-span-3 mr-5">
            <div className="bg-white border rounded-lg mb-5">
              <a
                href="#"
                className="rounded flex justify-center w-64 mb-5 p-2 mt-5 bg-sky-500 hover:bg-sky-800 ml-10 text-white"
                aria-label="Create new account"
              >
                <strong>
                  <i className="fab fa-forumbee"></i> Connect Forem Account
                </strong>
              </a>
              <a
                href="#"
                className="w-64 flex justify-center p-2 rounded mb-5 ml-10 bg-emerald-500 hover:bg-emerald-800 text-white"
                aria-label="Log in"
              >
                <strong>
                  <i className="fab fa-twitter"></i> Connect Twitter Account
                </strong>
              </a>
            </div>
            <div className="bg-white border rounded-lg">
              <div className="mx-5 my-5">
                <h2 className="my-5">User</h2>
                <Formik
                  initialValues={{
                    email: currentUserEmail,
                    bio: currentUserbio,
                    image: currentUserImg,
                    password: "",
                    username: currentUserName,
                  }}
                  onSubmit={onSubmit}
                  // validationSchema={Schema}
                >
                  <Form>
                    <div className="input-login mb-3">
                      <label className="mb-2">User Name</label>
                      <Field
                        id="username"
                        name="username"
                        type="username"
                        className="input-login_label"
                        placeholder="john"
                      />
                    </div>
                    <div className="input-login mb-3">
                      <label className="mb-2" htmlFor="user_email">
                        Email
                      </label>
                      <Field
                        id="email"
                        name="email"
                        placeholder="john@acme.com"
                        type="email"
                        className="input-login_label"
                      />
                    </div>
                    <div className="input-login mb-3">
                      <label className="mb-2" htmlFor="user_email">
                        Bio
                      </label>
                      <Field
                        id="bio"
                        name="bio"
                        placeholder="A short bio..."
                        as="textarea"
                        className="input-login_label h-40"
                      />
                    </div>
                    <div className="grid grid-cols-5">
                      <div>
                        <img
                          className="rounded-full mx-auto "
                          src={currentUser.image}
                          alt="Cat"
                          style={{ width: "50px", height: "50px" }}
                        />
                      </div>
                      <div className="input-login mb-3 col-span-4 ">
                        <Field
                          name="image"
                          placeholder="Add your comment..."
                          className="input-login_label"
                        />
                      </div>
                    </div>

                    <div className=" bg-blue-700 hover:bg-blue-800 btn-login  pt-3">
                      <button type="submit" className="w-full ">
                        Save Profile Information
                      </button>
                    </div>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
