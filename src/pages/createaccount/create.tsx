import { Field, Form, Formik, validateYupSchema } from "formik";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { createAccount } from "../../store/auth/auth.slice";
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { getAllArticles } from "../../store/article/article.slice";
import { checkToken } from "../../types/checkedToken";
import { createAccountTypeData } from "./../../types/index.type";

export interface ICreateAccountProps {}

export interface Values {
  username: string;
  email: string;
  password: string;
}
const loginSchema = yup.object({
  username: yup.string().min(2, "Too short").required("Name is required"),
  email: yup
    .string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required"),
  password: yup.string().max(255).required("Password is required"),
});
export default function CreateAccount(props: ICreateAccountProps) {
  let navigate = useNavigate();
  const islogin = useAppSelector((state) => state.userAuth.isLoading);

  const token = checkToken();
  // useEffect(() => {
  //   if (token) {
  //     return navigate("/relevan");
  //   }
  // }, [token]);

  const dispatch = useAppDispatch();
  const initialValues = {
    username: "",
    email: "",
    password: "",
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
                  Already have an account?{" "}
                  <NavLink
                    className="text-blue-600 hover:underline"
                    to="/login"
                  >
                    Log in
                  </NavLink>
                </span>
              </div>
              <Formik
                initialValues={initialValues}
                // validationSchema={loginSchema}
                onSubmit={(values, action) => {
                  const formCreate: createAccountTypeData = {
                    user: {
                      username: values.username,
                      email: values.email,
                      password: values.password,
                    },
                  };
                  console.log(values);
                  dispatch(createAccount(formCreate));
                  // dispatch(getAllArticles({}));

                  setTimeout(() => {
                    navigate("/relevan");
                  }, 3000);
                }}
                validationSchema={loginSchema}
              >
                {({ errors, touched }) => {
                  return (
                    <Form>
                      <div className="input-login mb-3">
                        <label className="mb-2" htmlFor="name">
                          Name
                        </label>
                        <Field
                          id="name"
                          name="username"
                          className="input-login_label"
                          type="text"
                        />
                        {errors.username && touched.username ? (
                          <div className="text-red-600">{errors.username}</div>
                        ) : null}
                      </div>
                      <div className="input-login mb-3">
                        <label className="mb-2" htmlFor="email">
                          Email
                        </label>
                        <Field
                          id="email"
                          name="email"
                          className="input-login_label"
                          type="email"
                        />
                        {errors.email && touched.email ? (
                          <div className="text-red-600">{errors.email}</div>
                        ) : null}
                      </div>
                      <div className="input-login mb-3">
                        <label className="mb-2" htmlFor="user_password">
                          Password
                        </label>
                        <Field
                          id="password"
                          name="password"
                          className="input-login_label"
                          type="password"
                        />
                        {errors.password && touched.password ? (
                          <div className="text-red-600">{errors.password}</div>
                        ) : null}
                      </div>

                      <div className=" pt-3  ">
                        <button className="w-full btn-login bg-blue-700 hover:bg-blue-600">
                          Create account
                        </button>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
