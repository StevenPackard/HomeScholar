import Axios from "axios";
import Vue from "vue";
import Vuex from "vuex";
import router from "../router/index";
import { api } from "./AxiosStore";

export const AssignmentsStore = {
  state: {
    assignments: [],
    activeAssignments: [],
  },
  mutations: {
    setAssignments(state, assignments) {
      state.assignments = assignments;
    },
    setActiveAssignments(state, assignments) {
      console.log(assignments);

      state.activeAssignments = assignments;
    },
  },
  actions: {
    async getAllAssignments({ commit, dispatch }) {
      try {
        let res = await api.get("assignments");
        commit("setAssignments", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async getAssignmentsByStudentId({ commit, dispatch }, id) {
      try {
        let res = await api.get("students/" + id + "/assignments");
        console.log(res.data);

        commit("setActiveAssignments", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async addAssignment({ commit, dispatch }, assignment) {
      try {
        let res = await api.post("assignments", assignment);
        dispatch("getAssignmentsByStudentId", assignment.studentId);
        commit("setActiveAssignments", res.data);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
