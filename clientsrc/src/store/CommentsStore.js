import Vue from "vue";
import router from "../router/index";
import { api } from "./AxiosStore";

export const CommentsStore = {
  state: {
    comments: [],
    activeComment: {},
  },
  mutations: {
    setComments(state, data) {
      state.comments = data;
    },
  },

  actions: {
    async addComment({ commit, dispatch }, data) {
      try {
        let res = await api.post("comments/", data);
      } catch (error) {
        console.error(error);
      }
    },
    async getCommentsByPostId({ commit, dispatch }, postId) {
      console.log("getting comments");
      console.log(postId);

      try {
        let res = await api.get("posts/" + postId + "/comments");
        commit("setComments", res.data);
        console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async deleteComment({ commit, dispatch }, data) {
      try {
        let res = await api.delete("Comments/" + data.id);
        console.log(res.data);
        dispatch("getAllComments");
      } catch (error) {}
    },
    async editComment({ commit, dispatch }, CommentData) {
      try {
        await api.put("Comments/" + CommentData.id, CommentData);
        dispatch("getAllComments");
      } catch (error) {
        console.error(error);
      }
    },
  },
};
