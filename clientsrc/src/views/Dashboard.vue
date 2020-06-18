<template>
  <div class="dashboard container-fluid">
    <div class="row timeline-box">
      <timeline />
    </div>
    <div class="row justify-content-center mt-4">
      <div class="col-12 shadow">
        <div class="row justify-content-center students-box bg-info">
          <student v-for="student in students" :key="student.id" :student="student" />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import timeline from "../components/TimelineComponent";
import assignment from "../components/AssignmentComponent";
import student from "../components/StudentMock";
export default {
  name: "dashboard",
  mounted() {
    this.$store.dispatch("getStudents");
  },
  data() {
    return {};
  },
  computed: {
    students() {
      return this.$store.state.StudentStore.students;
    }
  },
  methods: {},
  components: {
    timeline,
    assignment,
    student
  }
};
</script>


<style scoped>
.timeline-box {
  height: 50vh;
}
.students-box {
  height: 37vh;
  overflow-y: auto;
}
</style>