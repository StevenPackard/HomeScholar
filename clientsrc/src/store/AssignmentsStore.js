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
      let newState = state.assignments.filter((a) => a.id != assignment.id);
      console.log(newState, "first line");

      newState.push(assignment);
      console.log(newState, "secondLine");
      console.log(assignment, "assignment");

      state.assignments = newState;
    },
    setStudentAssignments(state, studentId) {
      state.studentAssignments = state.assignments.filter(
        (a) => a.studentId == studentId
      );
    },
  },
  // getters: {
  //   transcriptSummary: (state) => {
  //     let assignments = state.assignments.filter((e) => e.score >= 0);
  //     console.log(assignments);

  //     let subjectObj = {};

  //     for (let i = 0; i < assignments.length; i++) {
  //       let keys = Object.keys(subjectObj);
  //       for (let j = 0; j <= keys.length; j++) {
  //         if (keys.includes(assignments[i].subject)) {
  //           subjectObj[assignments[i].subject].push(assignments[i].score);
  //         } else {
  //           subjectObj[assignments[i].subject] = [assignments[i].score];
  //         }
  //       }
  //     }
  //     console.log(subjectObj);

  //     let keys = Object.keys(subjectObj);
  //     let avgObj = {};
  //     for (let i = 0; i < keys.length; i++) {
  //       avgObj[keys[i]] =
  //         subjectObj[keys[i]].reduce((a, b) => a + b, 0) /
  //         subjectObj[keys[i]].length;
  //     }
  //     return avgObj;
  //   },
  // },
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
        commit("setUpdateAssignment", res.data);
        if (updateDetails.fromDashboard) {
          console.log("hacky");
          // dispatch("getAllAssignments");
        }
      } catch (error) {
        console.error(error);
      }
    },
    async updateStudentMock({ commit, dispatch }, updateDetails) {
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
