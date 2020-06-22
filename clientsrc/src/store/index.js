import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import router from "../router/index";
import { api } from "./AxiosStore";
import { StudentStore } from "./StudentStore";
import { AssignmentsStore } from "./AssignmentsStore";
import { PostsStore } from "./PostsStore";
import { CommentsStore } from "./CommentsStore";
import socketStore from "./socketStore";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    events: [],
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    addToEvents(state, event) {
      state.events.push(event);
    },
  },
  actions: {
    // #region -- AUTH STUFF --
    setBearer({}, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    async getProfile({ commit, dispatch }) {
      try {
        let res = await api.get("/profile");
        commit("setUser", res.data);
        dispatch("getStudents");
      } catch (err) {
        console.error(err);
      }
    },

    async addEvent({ commit, dispatch }, arg) {
      try {
        let argObj = {
          date: new Date().getTime(),
          start: arg.start,
          end: arg.end,
          allDay: arg.allDay,
          studentId: arg.id,
        };
        let res = await api.put(
          "assignments/" + "5eebbf352f929106fb5433e8",
          argObj
        );
        commit("addToEvents", res.data);
      } catch (error) {
        console.error(error);
      }
    },
  },
  modules: {
    StudentStore,
    AssignmentsStore,
    PostsStore,
    CommentsStore,
    socketStore,
  },
});
