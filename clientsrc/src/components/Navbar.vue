<template>
  <nav class="navbar text-light shadow navbar-expand-lg navbar-light bg-info fixed-top">
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
        <li v-if="$auth.isAuthenticated" class="dropdown nav-item mt-2 ml-2">
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
            <p class="p-0 m-0"></p>

            <span v-for="student in students" :key="student.id">
              <a
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
                @click="routeToStudent(student.id)"
                type="button"
                class="nav-link"
              >{{ student.name }}</a>
            </span>
            <a
              class="dropdown-item pl-2"
              href="#"
              type="button"
              data-toggle="modal"
              data-target="#addStudentModal"
            >Add Student</a>
          </div>
        </li>
      </ul>

      <!-- <router-link
        :to="{ path: 'profile/' + user.id }"
        class="nav-link d-inline profileImgNav p-0 m-0 mr-3 active"
        data-toggle="collapse"
        data-target=".navbar-collapse.show"
      >
        <img class="profileImgNav d-inline" :src="user.picture" alt />
      </router-link>-->
      <img
        @click="routeToProfile"
        class="profileImgNav d-inline action mr-2"
        :src="user.picture"
        alt
      />

      <!--



routeToProfile

      -->

      <span class="navbar-text nav-item d-inline">
        <button
          class="btn btn-success btn-outline-dark d-inline"
          @click="login"
          v-if="!$auth.isAuthenticated"
        >Login</button>
        <button class="btn btn-danger btn-outline-dark" @click="showLogoutAlert" v-else>logout</button>
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
    },
    user() {
      return this.$store.state.user;
    }
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
        dangerMode: true
      }).then(willLogOut => {
        if (willLogOut) {
          this.logout();
        }
      });
    },

    routeToStudent(id) {
      this.$router.push("/student/" + id);
      this.$store.dispatch("getStudentById", id);
    },
    routeToProfile() {
      this.$router.push({ name: "profile", params: { id: this.user.id } });
      console.log(this.$route);
    }
  }
};
</script>

<style>
.profileImgNav {
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
}
</style>
