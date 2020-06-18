import Axios from "axios";
import Vue from "vue";
import Vuex from "vuex";
import router from "../router/index";
import { api } from "./AxiosStore";

export const AssignmentsStore = {
  state: {
    assignments: [],
    activeAssignments: [],
    activeAssignmentDetails: {},
  },
  mutations: {
    setActiveAssignmentDetails(state, assignmentId) {
      for (let i = 0; i < state.activeAssignments.length; i++) {
        console.log(state.activeAssignments[i].id);
        if (state.activeAssignments[i].id == assignmentId) {
          console.log(state.activeAssignments[i]);
          state.activeAssignmentDetails = state.activeAssignments[i];
        }
      }

      // let activeAsignment = state.activeAssignments.find((a) =>
      // {
      //   console.log(a.id);
      //   a.id == assignmentId;
      // }
      // );
      // debugger;
      // state.activeAssignmentDetails = activeAsignment;
    },
    setAssignments(state, assignments) {
      state.assignments = assignments;
    },
    setActiveAssignments(state, assignments) {
      console.log(assignments);

      state.activeAssignments = assignments;
    },
  },
  actions: {
    async updateAssignment({ commit, dispatch }, data) {
      try {
        let res = await api.put(`assignments/` + data.id, data);
        dispatch("getAssignmentsByStudentId", data.studentId.id);
      } catch (error) {
        console.error(error);
      }
    },
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
