import React from "react";
import { Field, Form, Formik } from "formik";

import { RouteProps, useNavigate } from "react-router-dom";
import { addArticle, getAllArticles } from "../../store/article/article.slice";
import { createArticlesType } from "../../types/index.type";
import { useAppDispatch } from "./../../app/hooks";
import "./layout.scss";
import "./tagName.scss";

enum FocusElement {
  None,
  Title,
  Tag,
  Content,
}

export default function CreateActicle(props: RouteProps) {
  const [focusElement, setFocusElement] = React.useState<FocusElement>(
    FocusElement.None
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [tags, setTags] = React.useState<string[]>([]);
  const removeTags = (indexToRemove: number) => {
    setTags([...tags.filter((_, index) => index !== indexToRemove)]);
  };

  const addTags = (event: any) => {
    if (event.key === " " || event.key === "Backspace") {
      setTags([...tags, event.target.value]);
      event.target.value = "";
    }
    console.log(event.key);
  };
  console.log(tags);

  interface PubListType {
    title: string;
    description: string;
    body: string;
    tagList: string;
  }
  const PubListSubmid = (value: PubListType) => {
    const formPubList: createArticlesType = {
      article: {
        title: value.title,
        description: "  ",
        body: value.body,
        tagList: tags,
      },
    };

    dispatch(addArticle(formPubList));
    navigate("/relevan");

    console.log(formPubList);
  };
  return (
    <div className="default_PageContent h-auto w-full">
      <div className="container mx-auto">
        <div className="box-border layout_post grid-cols-1  grid-cols-[500px_300px ] lg:grid-cols-[2fr_1fr]">
          <div className=" flex-col justify-center items-center ">
            <Formik
              initialValues={{
                title: "",
                description: "",
                body: "",
                tagList: "",
              }}
              onSubmit={PubListSubmid}
            >
              <Form>
                <div className="bg-white rounded-3xl p-20 pr-10 pb-10 h-[600px] flex flex-col gap-8">
                  <div className="mb-3 ">
                    <div className="style-butonAddIcon p-2 shadow-md cursor-pointer w-fit">
                      Add a cover image
                    </div>
                  </div>
                  <div className="border-b focus-within:border-black">
                    <Field
                      id="title"
                      name="title"
                      className="createPost-input font-bold text-5xl"
                      type="text"
                      placeholder="New post title here..."
                      onFocus={() => setFocusElement(FocusElement.Title)}
                      onBlur={() => setFocusElement(FocusElement.None)}
                    ></Field>
                  </div>
                  <div className="mt-3 border-b focus-within:border-black">
                    <div className="tags-input">
                      <ul id="tags">
                        {tags.map((tag, index) => (
                          <li key={index} className="tag">
                            <span className="tag-title">{tag}</span>
                            <span
                              className="tag-close-icon "
                              onClick={() => removeTags(index)}
                            >
                              x
                            </span>
                          </li>
                        ))}
                      </ul>
                      <input
                        className="outline-none inline-block w-full"
                        // value={tagName}
                        type="text"
                        placeholder="Add tags..."
                        onFocus={() => setFocusElement(FocusElement.Tag)}
                        onBlur={() => setFocusElement(FocusElement.None)}
                        onKeyUp={(event) =>
                          event.key === " " ? addTags(event) : null
                        }
                      />
                    </div>
                  </div>

                  <div className=" mt-3 border-b focus-within:border-black h-full">
                    <Field
                      as="textarea"
                      id="body"
                      name="body"
                      className="createPost-input font-medium w-full h-full "
                      type="text"
                      placeholder="Write your post content here..."
                      onFocus={() => setFocusElement(FocusElement.Content)}
                      onBlur={() => setFocusElement(FocusElement.None)}
                    ></Field>
                  </div>
                </div>
                <button
                  // type="submit"
                  className="style-butonPublish border rounded p-1 px-3 mt-2 shadow-md"
                >
                  Publish
                </button>
              </Form>
            </Formik>
          </div>
          <div className="hidden lg:block">
            {focusElement === FocusElement.Title ? (
              <div style={{ transform: "translateY(100px)" }}>
                <h3 className="mb-2 text-center">Writing a Great Post Title</h3>
                <ul className="list-disc pl-6 ">
                  <li>
                    Think of your post title as a super short (but compelling!)
                    description — like an overview of the actual post in one
                    short sentence.
                  </li>
                  <li>
                    Use keywords where appropriate to help ensure people can
                    find your post by search.
                  </li>
                </ul>
              </div>
            ) : (
              ""
            )}
            {focusElement === FocusElement.Tag ? (
              <div style={{ transform: "translateY(200px)" }}>
                <h3 className="mb-2 text-center">Tagging Guidelines</h3>
                <ul className="list-disc pl-6 ">
                  <li>Tags help people find your post.</li>
                  <li>
                    Think of tags as the topics or categories that best describe
                    your post.
                  </li>
                  <li>
                    Add up to four comma-separated tags per post. Combine tags
                    to reach the appropriate subcommunities.
                  </li>
                  <li>Use existing tags whenever possible.</li>
                  <li>
                    Some tags, such as “help” or “healthydebate”, have special
                    posting guidelines.
                  </li>
                </ul>
              </div>
            ) : (
              ""
            )}

            {focusElement === FocusElement.Content ? (
              <div style={{ transform: "translateY(300px)" }}>
                <h3 className="mb-2 text-center">Editor Basics</h3>
                <ul className="list-disc pl-6 ">
                  <li>
                    Use Markdown to write and format posts. Commonly used syntax
                  </li>
                  <li>
                    Embed rich content such as Tweets, YouTube videos, etc. Use
                    the complete URL: % embed https://... %. See a list of
                    supported embeds.
                  </li>
                  <li>
                    In addition to images for the post's content, you can also
                    drag and drop a cover image.
                  </li>
                </ul>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
