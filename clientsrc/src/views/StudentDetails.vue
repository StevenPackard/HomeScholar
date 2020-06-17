<template>
  <div class="student-details container-fluid">
    <div class="row">
      <div class="col-6">
        <h1>Student Name: {{ student.name }}</h1>
      </div>
      <div class="col-6">
        <h1>Student Grade Level: {{ student.gradeLevel }}</h1>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-10">
        <div class="row">
          <div class="col-12">
            <h1>Assignments</h1>
          </div>
        </div>
        <div class="row">
          <!-- <assignment /> -->
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

<style scoped></style>
