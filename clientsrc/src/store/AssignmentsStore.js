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
    ActiveAssignmentsbyStudentId: [],
  },
  mutations: {
    setActiveAssignmentDetails(state, assignmentId) {
      let foundAssignment = state.activeAssignments.find(
        (a) => a.id == assignmentId
      );
      state.activeAssignmentDetails = foundAssignment;
    },
    setAssignments(state, assignments) {
      state.assignments = assignments;
    },
    setActiveAssignments(state, assignments) {
      console.log(assignments);

      state.activeAssignments = assignments;
    },
    setDashboardAssignments(state, assignments) {
      Vue.set(
        state.ActiveAssignmentsbyStudentId,
        assignments.id,
        assignments.data
      );
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
    async getAssignmentsForDashboard({ commit, dispatch }, id) {
      try {
        let res = await api.get("students/" + id + "/assignments");
        let assignmentsObj = { id: id, data: res.data };

        commit("setDashboardAssignments", assignmentsObj);
      } catch (error) {
        console.error(error);
      }
    },
    async addAssignment({ commit, dispatch }, assignment) {
      try {
        let res = await api.post("assignments", assignment);
        commit("setActiveAssignments", res.data);
        dispatch("getAssignmentsByStudentId", assignment.studentId);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
