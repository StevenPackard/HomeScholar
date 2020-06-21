import Vue from "vue";
import router from "../router/index";
import { api } from "./AxiosStore";

export const CommentsStore = {
  state: {
    comments: [],
    activeComment: {},
  },
  mutations: {
    setActiveComment(state, data) {
      state.activeComment = data;
    },
    setComments(state, data) {
      state.comments = data;
    },
  },

  actions: {
    async setActiveComment({ commit, dispatch }, comment) {
      commit("setActiveComment", comment);
    },
    async addComment({ commit, dispatch }, data) {
      try {
        await api.post("comments/", data);
      } catch (error) {
        console.error(error);
      }
    },
    async getCommentsByPostId({ commit, dispatch }, postId) {
      try {
        let res = await api.get("posts/" + postId + "/comments");
        commit("setComments", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async deleteComment({ commit, dispatch }, comment) {
      try {
        await api.delete("Comments/" + comment.id);
        dispatch("getCommentsByPostId", comment.postId);
      } catch (error) {}
    },
    async editComment({ commit, dispatch }, CommentData) {
      try {
        await api.put("Comments/" + CommentData.id, CommentData);
        dispatch("getCommentsByPostId", CommentData.postId);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
