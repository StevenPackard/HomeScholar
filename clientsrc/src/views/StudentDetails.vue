<template>
  <div class="student-details container-fluid push-down">
    <div class="row justify-content-center">
      <div class="col-12 student-section bg-info">
        <div class="row justify-content-center">
          <div class="col-10 bg-warning details-section mt-5 shadow">
            <div class="row text-center justify-content-center mt-4">
              <div class="col-2 border mr-2 bg-light shadow">
                <h3>{{ student.name }}</h3>
              </div>
              <div class="col-2 border ml-2 bg-light shadow">
                <h3>Grade - {{ student.gradeLevel }}</h3>
              </div>
            </div>
            <div class="row justify-content-center">
              <div class="col-12 spacer"></div>
              <div class="col-5 text-center">
                <h1>Assignments</h1>
              </div>
              <div class="col-11 assignment-box bg-info">
                <div class="row justify-content-center">
                  <assignmentComponentMock
                    v-for="assignment in assignments"
                    :key="assignment.id"
                    :assignment="assignment"
                  />
                </div>
              </div>
              <div class="col-4 text-center">
                <button
                  data-toggle="modal"
                  data-target="#addAssignmentModal"
                  class="btn-lg btn-success text-dark mt-3 shadow"
                >
                  Add Assignment
                </button>
                <button
                  @click="deleteStudent"
                  class="btn-lg mx-2 btn-danger shadow"
                >
                  Delete Student
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AssignmentComponentMock from "@/components/AssignmentComponentMock";
export default {
  name: "student-details",
  mounted() {
    this.$store.dispatch("getStudentById", this.$route.params.id);
    this.$store.dispatch("getAssignmentsByStudentId", this.$route.params.id);
  },
  // beforeUpdate() {
  //   this.$store.dispatch("getStudentById", this.$route.params.id);
  // },
  data() {
    return {};
  },
  computed: {
    student() {
      return this.$store.state.StudentStore.activeStudent;
    },
    assignments() {
      return this.$store.state.AssignmentsStore.activeAssignments;
    },
  },
  methods: {
    deleteStudent() {
      this.$store.dispatch("deleteStudent", this.$route.params.id);
    },
  },
  components: {
    AssignmentComponentMock,
  },
};
</script>

<style scoped>
.student-section {
  height: 50vh;
}
.details-section {
  height: 70vh;
}
.spacer {
  height: 5vh;
}
.assignment-box {
  height: 43vh;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
