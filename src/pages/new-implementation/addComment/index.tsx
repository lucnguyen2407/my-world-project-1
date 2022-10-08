import { Field, Form, Formik } from "formik";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  addComment,
  getListComment,
} from "../../../store/comment/comment.slice";

import { addCommentsType } from "../../../types/index.type";

export interface Value {
  comment: string;
}
export interface Props {
  slug: string | undefined;
}

export function Comment({ slug }: Props) {
  const currentUser = useAppSelector((state) => state.userAuth.userState.user);
  const isLoginSuccess = useAppSelector(
    (state) => state.userAuth.isLoginSuccess
  );
  const dispatch = useAppDispatch();
  const onSubmit = (values: Value, actions: any) => {
    actions.resetForm({
      comment: {
        body: "",
      },
    });
    const formLogin: addCommentsType = {
      comment: {
        body: values.comment,
      },
    };
    dispatch(
      addComment({
        bodyReq:{comment: {
          body: values.comment,
        }},
        slug,
      })
    );
    dispatch(getListComment(slug));

    // console.log(formLogin);
    // console.log(slug);
  };
  if (isLoginSuccess) {
    return (
      <div>
        <Formik
          initialValues={{
            comment: "",
          }}
          onSubmit={onSubmit}
        >
          {({ values, errors, handleSubmit, handleChange, handleBlur }) => {
            return (
              <Form className="mt-5">
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
                      id="comment"
                      name="comment"
                      placeholder="Add your comment..."
                      as="textarea"
                      className="input-login_label"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-5">
                  <div></div>
                  <button className="w-24 btn-login bg-blue-700 hover:bg-blue-800">
                    Submit
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    );
  } else {
    return <></>;
  }
}
