<template>
  <div class="student-mock-component col-12 my-3 bg-warning shadow">
    <div class="row text-center">
      <div class="col-12 border">
        <h3>{{ student.name }}</h3>
      </div>
    </div>
    <div class="row assignment-box bg-info">
      <AssignmentComponentMock
        v-for="assignment in assignments"
        :key="assignment.id"
        :assignment="assignment"
      />
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
    this.$store.dispatch("getAssignmentsForDashboard", this.student.id);
  },
  computed: {
    assignments() {
      return this.$store.state.AssignmentsStore.ActiveAssignmentsbyStudentId[
        this.student.id
      ];
    },
  },
  methods: {},
  components: {
    AddAssignmentModal,
    AssignmentComponentMock,
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
  overflow-x: hidden;
}
</style>
