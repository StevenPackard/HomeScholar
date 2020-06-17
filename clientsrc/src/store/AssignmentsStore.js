import Axios from "axios";
import Vue from "vue";
import Vuex from "vuex";
import router from "../router/index";
import { api } from "./AxiosStore";

export const AssignmentsStore = {
  state: {
    assignments: [],
  },
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
  async addAssignment({ commit, dispatch }, assignment) {
    try {
      let res = await api.post("assignments", assignment);
      dispatch("getAssignments", assignment.student);
    } catch (error) {
      console.error(error);
    }
  },
};
