import Axios from "axios";
import Vue from "vue";
import Vuex from "vuex";
import router from "../router/index";
import { api } from "./AxiosStore";

export const StudentStore = {
  state: {
    students: [],
  },
  mutations: {
    setStudents(state, students) {
      state.students = students;
    },
  },
  actions: {
    //#endregion

    //#region -- BOARDS --

    //#endregion

    //#region -- LISTS --
    async getStudents({ commit, dispatch }) {
      try {
        let res = await api.get("students");
        commit("setStudents", res.data);
      } catch (error) {
        console.error(error);
      }
    },

    //#endregion
  },
};
