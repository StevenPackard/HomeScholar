import Axios from "axios";
import Vue from "vue";
import Vuex from "vuex";
import router from "../router/index";
import { api } from "./AxiosStore";

export const AssignmentsStore = {
  mutations: {
    setAssignments(state, assignments) {
      state.assignments = assignments;
    },
  },
  actions: {
    async getAssignments({ commit, dispatch }, student) {
      try {
        let res = await api.get("students/" + student.id + "/assignments");
        commit("setAssignments", res.data);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
