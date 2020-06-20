import Vue from "vue";
import router from "../router/index";
import { api } from "./AxiosStore";

export const PostsStore = {
  state: {
    posts: [],
  },
  mutations: {
    setPosts(state, data) {
      state.posts = data;
    },
  },
  actions: {
    async deletePost({ commit, dispatch }, data) {
      try {
        let res = await api.delete("Posts/" + data.id);
        console.log(res.data);
        dispatch("getAllPosts");
      } catch (error) {}
    },
    async editPost({ commit, dispatch }, PostData) {
      try {
        let res = await api.put("Posts/" + PostData.id, PostData);

        dispatch("getAllPosts");
      } catch (error) {
        console.error(error);
      }
    },
    async getAllPosts({ commit, dispatch }) {
      console.log("getting posts");

      try {
        let res = await api.get("Posts");
        commit("setPosts", res.data);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
