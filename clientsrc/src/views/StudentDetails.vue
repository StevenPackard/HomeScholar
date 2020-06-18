<template>
  <div class="student-details container-fluid">
    <div class="row justify-content-center">
      <div class="col-12 student-section bg-info">
        <div class="row justify-content-center">
          <div class="col-10 bg-warning details-section mt-5 shadow">
            <div class="row text-center justify-content-center mt-4">
              <div class="col-2 border mr-2 bg-light shadow">
                <h3>{{student.name}}</h3>
              </div>
              <div class="col-2 border ml-2 bg-light shadow">
                <h3>Grade - {{student.gradeLevel}}</h3>
              </div>
            </div>
            <div class="row justify-content-center">
              <div class="col-12 spacer"></div>
              <div class="col-5 text-center">
                <h1>Assignments</h1>
              </div>
              <div class="col-11 assignment-box bg-dark">
                <div class="row justify-content-center">
                  <div class="col-11 text-center bg-light mt-3">
                    <div class="row">
                      <div class="col-4">
                        <h3>Subject</h3>
                      </div>
                      <div class="col-4">
                        <h3>Assignment Name</h3>
                      </div>
                      <div class="col-4">
                        <h3>Grade</h3>
                      </div>
                    </div>
                  </div>
                  <div class="col-11 text-center bg-light mt-3">
                    <div class="row">
                      <div class="col-4">
                        <h3>Subject</h3>
                      </div>
                      <div class="col-4">
                        <h3>Assignment Name</h3>
                      </div>
                      <div class="col-4">
                        <h3>Grade</h3>
                      </div>
                    </div>
                  </div>
                  <div class="col-11 text-center bg-light mt-3">
                    <div class="row">
                      <div class="col-4">
                        <h3>Subject</h3>
                      </div>
                      <div class="col-4">
                        <h3>Assignment Name</h3>
                      </div>
                      <div class="col-4">
                        <h3>Grade</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-4 text-center">
                <button class="btn-lg btn-success text-dark mt-3 shadow">Add Assignment</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "student-details",
  mounted() {
    this.$store.dispatch("getStudentById", this.$route.params.id);
    // this.$store.dispatch("getAssignmentsByStudentId", this.$route.params.id);
  },
  beforeUpdate() {
    this.$store.dispatch("getStudentById", this.$route.params.id);
  },
  data() {
    return {};
  },
  computed: {
    student() {
      return this.$store.state.StudentStore.activeStudent;
    }
  },
  methods: {},
  components: {}
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
}
</style>
