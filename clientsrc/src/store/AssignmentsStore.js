import Vue from "vue";
import router from "../router/index";
import { api } from "./AxiosStore";

export const AssignmentsStore = {
  state: {
    assignments: [],
    // activeAssignments: [],
    activeAssignmentDetails: {},
    ActiveAssignmentsbyStudentId: [],
    studentAssignments: [],
  },
  mutations: {
    setActiveAssignmentDetails(state, assignmentId) {
      let foundAssignment = state.assignments.find((a) => a.id == assignmentId);
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
    setUpdateAssignment(state, assignment) {
      state.assignments.push(assignment);
    },
    setStudentAssignments(state, studentId) {
      state.studentAssignments = state.assignments.filter(
        (a) => a.studentId == studentId
      );
    },
  },
  actions: {
    async deleteAssignment({ commit, dispatch }, data) {
      try {
        let res = await api.delete("assignments/" + data.id);
        console.log(res.data);
        dispatch("getAllAssignments");
        dispatch("getAssignmentsByStudentId", data.studentId.id);
      } catch (error) {}
    },
    async editAssignment({ commit, dispatch }, assignmentData) {
      try {
        let res = await api.put(
          "assignments/" + assignmentData.id,
          assignmentData
        );

        dispatch("getAllAssignments");
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
        dispatch("getAllAssignments");
      } catch (error) {
        console.error(error);
      }
    },
    async updateAssignment({ commit, dispatch }, updateDetails) {
      try {
        let res = await api.put(
          "assignments/" + updateDetails.assignmentId,
          updateDetails
        );
        // commit("setUpdateAssignment", res.data);
        dispatch("getAllAssignments");
      } catch (error) {
        console.error(error);
      }
    },
    async editAssignColor({ commit, dispatch }, data) {
      try {
        let studentAssignments = this.state.AssignmentsStore.assignments.filter(
          (a) => a.studentId.id == data.studentId
        );
        studentAssignments.forEach(async (a) => {
          (a.backgroundColor = data.color),
            await api.put("assignments/" + a.id, a);
        });
      } catch (error) {
        console.error(error);
      }
    },
  },
};
