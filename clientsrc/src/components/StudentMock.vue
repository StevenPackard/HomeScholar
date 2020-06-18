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
          <AssignmentComponentMock />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AssignmentComponentMock from "../components/AssignmentComponentMock";
import AddAssignmentModal from "../components/AssignmentModal";
export default {
  name: "student-mock",
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("getAssignmentsByStudentId", this.student.id);
  },
  computed: {
    assignments() {
      return this.$store.state.AssignmentsStore;
    }
  },
  methods: {},
  components: {
    AddAssignmentModal,
    AssignmentComponentMock
  },
  props: ["student"]
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
