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
    students: [],
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setStudents(state, students) {
      state.students = students;
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
  },
  modules: {
    StudentStore,
    AssignmentsStore,
  },
});
