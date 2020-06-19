<template>
  <div id="app">
    <navbar />
    <router-view class="grow" />
    <footer class="text-center bg-primary">
      <h5>
        Made with Love by Justin
        <i class="fa fa-book fa-sm" aria-hidden="true"></i> Troy
        <i class="fa fa-book fa-sm" aria-hidden="true"></i> Chris
        <i class="fa fa-book fa-sm" aria-hidden="true"></i> Steven
      </h5>
    </footer>
    <assignmentModal />
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import { onAuth } from "@bcwdev/auth0-vue";
import AssignmentModal from "@/components/AssignmentModal";
export default {
  name: "App",
  async beforeCreate() {
    try {
      await onAuth();
      this.$store.dispatch("setBearer", this.$auth.bearer);
      await this.$store.dispatch("getProfile");
      this.$store.dispatch("getStudents");
    } catch (err) {
      this.$router.push({ name: "home" });
    }
  },
  components: {
    Navbar,
    AssignmentModal
  }
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
</style>