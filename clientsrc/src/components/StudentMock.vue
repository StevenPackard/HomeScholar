<template>
  <div class="student-mock-component col-12 my-3 bg-warning shadow">
    <div class="row text-center">
      <div class="col-12 border">
        <h3>{{ student.name }}</h3>
      </div>
    </div>
    <div class="row justify-content-center assignment-box">
      <div class="col-11 bg-dark mt-3 shadow">
        <div class="row text-center bg-light my-3">
          <div class="col-4">
            <h4>Subject</h4>
          </div>
          <div class="col-4">
            <h4>Assignment</h4>
          </div>
          <div class="col-4">
            <h4 class="text-danger">Incomplete</h4>
          </div>
        </div>
        <div class="row text-center bg-light my-3">
          <div class="col-4">
            <h4>Subject</h4>
          </div>
          <div class="col-4">
            <h4>Assignment</h4>
          </div>
          <div class="col-4">
            <h4 class="text-success">Complete</h4>
          </div>
        </div>
        <div class="row text-center bg-light my-3">
          <div class="col-4">
            <h4>Subject</h4>
          </div>
          <div class="col-4">
            <h4>Assignment</h4>
          </div>
          <div class="col-4">
            <h4 class="text-danger">Incomplete</h4>
          </div>
        </div>
        <div class="row text-center bg-light my-3">
          <div class="col-4">
            <h4>Subject</h4>
          </div>
          <div class="col-4">
            <h4>Assignment</h4>
          </div>
          <div class="col-4">
            <h4 class="text-danger">Incomplete</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddAssignmentModal from "../components/AssignmentModal";
export default {
  name: "student-mock",
  data() {
    return {};
  },
  computed: {},
  methods: {},
  components: {
    AddAssignmentModal,
  },
  props: ["student"],
};
</script>

<style scoped>
.student-mock-component {
  height: 30vh;
}
.assignment-box {
  height: 24vh;
  overflow-y: auto;
}
</style>
