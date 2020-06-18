import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import router from "../router/index";
import { api } from "./AxiosStore";
import { StudentStore } from "./StudentStore";
import { AssignmentsStore } from "./AssignmentsStore";

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
    async getProfile({ commit }) {
      try {
        let res = await api.get("/profile");
        commit("setUser", res.data);
      } catch (err) {
        console.error(err);
      }
    },

    async addEvent({ commit, dispatch }, arg) {
      try {
        let argObj = {
          id: new Date().getTime(),
          title: "something",
          start: arg.start,
          end: arg.end,
          allDay: arg.allDay,
        };
        commit("addToEvents", argObj);
      } catch (error) {
        console.error(error);
      }
    },
  },
  modules: {
    StudentStore,
    AssignmentsStore,
  },
});
