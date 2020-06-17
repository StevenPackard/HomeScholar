<template>
  <div class="dashboard container-fluid">
    <div class="row">
      <timeline />
    </div>
    <div class="row">
      <assignment />
    </div>
  </div>
</template>


<script>
import timeline from "../components/TimelineComponent";
import assignment from "../components/AssignmentComponent";
export default {
  name: "dashboard",
  data() {
    return {};
  },
  computed: {},
  methods: {},
  components: {
    timeline,
    assignment
  }
};
</script>


<style scoped>
</style>