<template>
  <div class="student-details container">
    <div class="row">
      <div class="col">
        <h1>Name and Grade</h1>
      </div>
    </div>
    <div class="row">
      <student />
    </div>
  </div>
</template>


<script>
import student from "../components/StudentComponent";
export default {
  name: "student-details",
  data() {
    return {};
  },
  computed: {},
  methods: {},
  components: {
    student
  }
};
</script>


<style scoped>
</style>