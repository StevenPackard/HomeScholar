import Vue from "vue";
import router from "../router/index";
import { api } from "./AxiosStore";

export const CommentsStore = {
  state: {
    comments: [],
  },
  mutations: {
    setComments(state, data) {
      state.comments = data;
    },
  },
  actions: {
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
