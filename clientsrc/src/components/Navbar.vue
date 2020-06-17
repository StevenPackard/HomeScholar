<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-primary">
    <router-link class="navbar-brand" :to="{ name: 'home' }"
      >HomeScholar</router-link
    >
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item" :class="{ active: $route.name == 'dashboard' }">
          <router-link :to="{ name: 'dashboard' }" class="nav-link"
            >Dashboard</router-link
          >
        </li>
        <li class="dropdown nav-item mt-2">
          <a
            class="dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            >Students</a
          >
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <span v-for="student in students" :key="student.id">
              <router-link
                :to="{ path: `/student/${student.id}` }"
                class="nav-link"
                >{{ student.name }}</router-link
              >
            </span>
            <a
              class="dropdown-item pl-2 "
              href="#"
              data-toggle="modal"
              data-target="#addStudentModal"
              >Add Student</a
            >
          </div>
        </li>
        <!-- <li class="nav-item" :class="{ active: $route.name == 'student-details' }">
          <router-link :to="{ name: 'student-details' }" class="nav-link">Students</router-link>
        </li>-->
      </ul>
      <span class="navbar-text">
        <button
          class="btn btn-success"
          @click="login"
          v-if="!$auth.isAuthenticated"
        >
          Login
        </button>
        <button class="btn btn-danger" @click="logout" v-else>logout</button>
      </span>
    </div>
    <div
      class="modal fade"
      id="addStudentModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="addStudentModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-center" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addStudentModalLabel">Add Student</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="studentName" class="col-form-label"
                  >Student Name</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="studentName"
                  v-model="addStudent.name"
                />
              </div>
              <div class="form-group">
                <label for="studentDescription" class="col-form-label"
                  >Description</label
                >
                <textarea
                  class="form-control"
                  id="studentDescription"
                  v-model="addStudent.description"
                ></textarea>
              </div>
              <div class="form-group">
                <label for="studentGrade" class="col-form-label">Grade</label>
                <input
                  class="form-control"
                  id="studentGrade"
                  type="number"
                  v-model="addStudent.gradeLevel"
                />
              </div>
              <div class="form-group">
                <label for="studentSubjects" class="col-form-label"
                  >Subjects (Optional)</label
                >
                <input
                  class="form-control"
                  id="studentSubjects"
                  type="text"
                  v-model="addStudent.subjects"
                />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="submitNewStudent"
            >
              Add Student
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from "axios";

let _api = axios.create({
  baseURL: "https://localhost:3000",
  withCredentials: true,
});
export default {
  name: "Navbar",
  data() {
    return {
      addStudent: {},
    };
  },
  computed: {
    students() {
      return this.$store.state.students;
    },
  },
  methods: {
    async login() {
      await this.$auth.loginWithPopup();
      this.$store.dispatch("setBearer", this.$auth.bearer);
      this.$store.dispatch("getProfile");
      console.log("this.$auth.user: ");
      console.log(this.$auth.user);
    },
    async logout() {
      await this.$auth.logout({ returnTo: window.location.origin });
    },
    submitNewStudent() {
      this.$store.dispatch("addStudent", { ...this.addStudent });
      this.addStudent = {};
      $("#addStudentModal").modal("hide");
    },
  },
};
</script>

<style></style>
