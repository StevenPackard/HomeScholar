<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-info fixed-top">
    <router-link class="navbar-brand" :to="{ name: 'home' }">
      <b>HomeScholar</b>
    </router-link>
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
        <li class="nav-item active">
          <router-link :to="{ name: 'dashboard' }" class="nav-link">
            <b>Dashboard</b>
          </router-link>
        </li>
        <li class="dropdown nav-item mt-2">
          <a
            class="dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <b>Students</b>
          </a>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <span v-for="student in students" :key="student.id">
              <router-link
                :to="{ path: `/student/${student.id}` }"
                class="nav-link"
              >{{ student.name }}</router-link>
            </span>
            <a
              class="dropdown-item pl-2"
              href="#"
              data-toggle="modal"
              data-target="#addStudentModal"
            >Add Student</a>
          </div>
        </li>
        <!-- <li class="nav-item" :class="{ active: $route.name == 'student-details' }">
          <router-link :to="{ name: 'student-details' }" class="nav-link">Students</router-link>
        </li>-->
      </ul>
      <span class="navbar-text">
        <button class="btn btn-success" @click="login" v-if="!$auth.isAuthenticated">Login</button>
        <button class="btn btn-danger" @click="logout" v-else>logout</button>
      </span>
    </div>
  </nav>
</template>

<script>
import axios from "axios";
let _api = axios.create({
  baseURL: "https://localhost:3000",
  withCredentials: true
});
export default {
  name: "Navbar",

  data() {
    return {};
  },
  computed: {
    students() {
      return this.$store.state.StudentStore.students;
    }
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
    }
  }
};
</script>

<style></style>
