<template>
  <div class="bg-grey" id="app">
    <navbar />
    <router-view class="grow" />
    <footer class="text-center bg-info">
      <h5 class="text-light">
        Made with Love by
        <a
          class="hover-style"
          target="_blank"
          href="https://github.com/JustinLGates"
        >
          Justin
          <!-- <i class="fa fa-book fa-sm text-dark" aria-hidden="true"></i> -->
        </a>
        <span>&</span>
        <a class="hover-style" target="_blank" href="https://github.com/TroyFuhriman">
          Troy
          <!-- <i class="fa fa-book fa-sm text-dark" aria-hidden="true"></i> -->
        </a>
        <span>&</span>
        <a class="hover-style" target="_blank" href="https://github.com/christopherfelt">
          Chris
          <!-- <i class="fa fa-book fa-sm text-dark" aria-hidden="true"></i> -->
        </a>
        <span>&</span>
        <a class="hover-style" target="_blank" href="https://github.com/StevenPackard">
          Steven
          <!-- <i class="fa fa-book fa-sm text-dark" aria-hidden="true"></i> -->
        </a>
      </h5>
    </footer>
    <assignmentModal />
    <searchModal />
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import { onAuth } from "@bcwdev/auth0-vue";
import AssignmentModal from "@/components/AssignmentModal";
import searchModal from "./components/Modals/searchmodal";
export default {
  name: "App",
  async beforeCreate() {
    try {
      await onAuth();
      this.$store.dispatch("setBearer", this.$auth.bearer);
      this.$store.dispatch("getProfile");
    } catch (err) {
      this.$router.push({ name: "home" });
    }
  },
  components: {
    Navbar,
    AssignmentModal,
    searchModal,
  },
};
</script>
<style lang="scss">
@import "./assets/anims.css";
@import "./assets/minty.scss";
@import "bootstrap";
// @import "./assets/_overrides.scss";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow-x: auto;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.grow {
  flex-grow: 1;
}
.action {
  cursor: pointer;
}
.bg-grey {
  background-color: #e9ebed;
}
.hover-style:hover {
  text-decoration: none;
}
</style>
