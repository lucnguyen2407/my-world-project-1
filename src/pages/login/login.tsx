import * as React from "react";
import * as yup from "yup";
import { Formik, Field, Form, FormikHelpers } from "formik";
import "./login.scss";
import { userLoginTypeData } from "../../types/index.type";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { login } from "../../store/auth/auth.slice";
import { NavLink, useNavigate } from "react-router-dom";
import { checkToken } from "../../types/checkedToken";
import {
  getAllArticles,
  getAllArticlesSuccess,
} from "../../store/article/article.slice";
export interface ILoginProps {}

const loginSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email")
    .max(255)
    .required("Email is required"),
  password: yup.string().max(255).required("Password is required"),
});

interface Values {
  email: string;
  password: string;
}

export default function Login(props: ILoginProps) {
  const isLoading = useAppSelector((state) => state.userAuth.isLoginSuccess);
  const dispatch = useAppDispatch();
  let navigate = useNavigate();
  // const logged = useAppSelector((state) => state.userAuth.);
  const token = checkToken();
  const islogin = useAppSelector((state) => state.userAuth.isLoading);
  const onSubmit = (values: Values) => {
    const formLogin: userLoginTypeData = {
      user: {
        email: values.email,
        password: values.password,
      },
    };
    dispatch(login(formLogin));

    setTimeout(() => {
      navigate("/relevan");
    }, 3000);

    console.log(formLogin);
  };

  return (
    <div>
      <section className="default_PageLogin ">
        {islogin ? (
          <div className="box-border PageContainer-loading ">
            <div className="wrapper">
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="shadow"></div>
              <div className="shadow"></div>
              <div className="shadow"></div>
              <span>Loading</span>
            </div>
          </div>
        ) : null}
        <div className="login_card m-auto p-10 shadow-lg">
          <div className="">
            <h1 className="">Welcome to DEV Community 👩‍💻👨‍💻</h1>
            <p className="">
              <a href="/" className="c-link c-link--branded">
                DEV Community 👩‍💻👨‍💻
              </a>{" "}
              is a community of 916,849 amazing developers
            </p>
          </div>
          <div className="">
            <div className="grid gap-2 my-4">
              <button className="btn-login bg-black hover:bg-gray-900">
                <i className="fab fa-apple mr-3"></i>
                Continue with Apple
              </button>
              <button className="btn-login bg-teal-900 hover:bg-teal-800">
                <i className="fas fa-vr-cardboard mr3"></i>
                Continue with Forem
              </button>
              <button className="btn-login bg-gray-800 hover:bg-gray-900">
                <i className="fab fa-github mr-3"></i>
                Continue with GitHub
              </button>
              <button className="btn-login bg-blue-500 hover:bg-blue-600">
                <i className="fab fa-twitter mr-3"></i>
                Continue with Twitter
              </button>
            </div>
            <div
              className="registration__actions-email"
              id="sign-in-password-form"
            >
              <div className="registration__hr">
                <span className="registration__hr-label">
                  Have a password? Continue with your email address
                </span>
              </div>
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                onSubmit={onSubmit}
                validationSchema={loginSchema}
              >
                {({
                  values,
                  errors,
                  handleSubmit,
                  handleChange,
                  handleBlur,
                  touched,
                }) => {
                  return (
                    <Form>
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
                        {errors.email && touched.email ? (
                          <div className="text-red-600">{errors.email}</div>
                        ) : null}
                      </div>
                      <div className="input-login mb-3">
                        <label className="mb-2" htmlFor="user_email">
                          Password
                        </label>
                        <Field
                          id="password"
                          name="password"
                          type="password"
                          className="input-login_label"
                        />
                        {errors.password && touched.password ? (
                          <div className="text-red-600">{errors.password}</div>
                        ) : null}
                      </div>
                      <div className="  pt-3">
                        <button className="w-full btn-login bg-blue-700 hover:bg-blue-800">
                          Login
                        </button>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
              <NavLink to="/account">
                <p className="pt-6 text-center text-blue-700">
                  I forgot my password
                </p>
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
