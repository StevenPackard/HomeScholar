<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-info fixed-top">
    <router-link
      class="navbar-brand"
      data-toggle="collapse"
      data-target=".navbar-collapse.show"
      :to="{ name: 'home' }"
    >
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
        <li v-if="$auth.isAuthenticated" class="nav-item active">
          <router-link
            :to="{ name: 'dashboard' }"
            class="nav-link"
            data-toggle="collapse"
            data-target=".navbar-collapse.show"
          >
            <b>Dashboard</b>
          </router-link>
        </li>
        <li v-if="$auth.isAuthenticated" class="nav-item active">
          <router-link
            :to="{ name: 'posts' }"
            data-toggle="collapse"
            data-target=".navbar-collapse.show"
            class="nav-link"
          >
            <b>Posts</b>
          </router-link>
        </li>
        <li v-if="$auth.isAuthenticated" class="dropdown nav-item mt-2">
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
              <a
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
                @click="routeToStudent(student.id)"
                type="button"
                class="nav-link"
                >{{ student.name }}</a
              >
            </span>
            <a
              class="dropdown-item pl-2"
              href="#"
              type="button"
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
          class="btn btn-success btn-outline-dark"
          @click="login"
          v-if="!$auth.isAuthenticated"
        >
          Login
        </button>
        <button
          class="btn btn-danger btn-outline-dark"
          @click="showLogoutAlert"
          v-else
        >
          logout
        </button>
      </span>
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
    return {};
  },
  computed: {
    students() {
      return this.$store.state.StudentStore.students;
    },
  },
  methods: {
    async login() {
      await this.$auth.loginWithPopup();
      this.$store.dispatch("setBearer", this.$auth.bearer);
      this.$store.dispatch("getProfile");
      this.$router.push({ name: "dashboard" });
      console.log("this.$auth.user: ");
      console.log(this.$auth.user);
    },
    async logout() {
      await this.$auth.logout({ returnTo: window.location.origin });
    },
    showLogoutAlert() {
      swal({
        title: "Are you sure you want to log out?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willLogOut) => {
        if (willLogOut) {
          this.logout();
        }
      });
    },

    routeToStudent(id) {
      this.$router.push("/student/" + id);
      this.$store.dispatch("getStudentById", id);
    },
  },
};
</script>

<style></style>
