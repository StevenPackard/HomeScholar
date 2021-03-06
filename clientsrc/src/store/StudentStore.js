import Axios from "axios";
import Vue from "vue";
import Vuex from "vuex";
import router from "../router/index";
import { api } from "./AxiosStore";

export const StudentStore = {
  state: {
    students: [],
    activeStudent: {},
  },
  mutations: {
    setStudents(state, students) {
      state.students = students;
    },
    setActiveStudent(state, student) {
      state.activeStudent = student;
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

    async getStudentById({ commit, dispatch }, id) {
      try {
        let res = await api.get("students/" + id);
        commit("setActiveStudent", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async addStudent({ commit, dispatch }, studentData) {
      try {
        let res = await api.post("students", studentData);
        console.log(res.data);
        dispatch("getStudents");
      } catch (error) {
        console.error(error);
      }
    },
    async editStudent({ commit, dispatch }, studentData) {
      try {
        let res = await api.put("students/" + studentData.id, studentData);
        dispatch("getStudents");
      } catch (error) {
        console.error(error);
      }
    },

    async deleteStudent({ commit, dispatch }, id) {
      try {
        let res = await api.delete("students/" + id);
        dispatch("getStudents");
        router.push({ name: "dashboard" });
      } catch (error) {
        console.error(error);
      }
    },

    //#endregion
  },
};
