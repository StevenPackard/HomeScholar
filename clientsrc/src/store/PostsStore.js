import Vue from "vue";
import router from "../router/index";
import { api } from "./AxiosStore";

export const PostsStore = {
  state: {
    posts: [],
    activePost: {},
    events: [],
  },

  mutations: {
    setActivePost(state, post) {
      state.activePost = post;
    },
    setPosts(state, data) {
      state.posts = data;
    },
    setActiveEvents(state, events) {
      state.events = events;
    },
  },
  actions: {
    async deleteEvent({ commit, dispatch }, id) {
      try {
        await api.delete("events/" + id);
      } catch (error) {}
    },
    async addPost({ commit, dispatch }, data) {
      try {
        console.log(JSON.stringify(data));
        let res = await api.post("posts", data);
        console.log(res.data);
        dispatch("getAllPosts");
      } catch (error) {
        console.error(error);
      }
    },
    async addEvent({ commit, dispatch }, data) {
      try {
        console.log("adding event");
        await api.post("events", data);
        console.log("event added....");
        dispatch("getAllEvents");
      } catch (error) {
        console.error(error);
      }
    },
    async setActivePost({ commit, dispatch }, postId) {
      try {
        let res = await api.get("posts/" + postId);
        commit("setActivePost", res.data);
      } catch (error) {
        console.error(error);
      }
    },
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
        console.log(res.data);

        dispatch("getAllPosts");
      } catch (error) {
        console.error(error);
      }
    },
    async getAllPosts({ commit, dispatch }) {
      try {
        let res = await api.get("Posts");
        commit("setPosts", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async getFilteredPosts({ commit, dispatch }, data) {
      try {
        let posts = [];
        let res = await api.post("posts/filter", data);
        posts = res.data;
        if (data.vitrual === false) {
          posts = res.data.filter((elem) => !elem.virtual);
        }
        if (data.inPerson === false) {
          posts = res.data.filter((elem) => elem.virtual);
        }
        commit("setPosts", posts);
      } catch (error) {}
    },
    async getAllEvents({ commit, dispatch }) {
      try {
        let res = await api.get("events");
        commit("setActiveEvents", res.data);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
