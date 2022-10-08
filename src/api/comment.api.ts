import axiosInstance from ".";
import { addCommentsType, CommentsListType } from "../types/index.type";

export const commentApi = {
  getCommentByArticle(slug: string): Promise<any> {
    return axiosInstance.get(`/articles/${slug}/comments`);
  },
  addComment(
    commentData: addCommentsType,
    slug: string
  ): Promise<CommentsListType> {
    console.log("comment", commentData);

    return axiosInstance.post(`/articles/${slug}/comments`, commentData);
  },
  deleteComment(id: string, slug: string): Promise<CommentsListType> {
    console.log("id", id);
    return axiosInstance.delete(`/articles/${slug}/comments/${id}`);
  },
};
