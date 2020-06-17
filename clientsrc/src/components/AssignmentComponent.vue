<template>
  <div class="assignment-component col">
    <div class="bg-light shadow mt-5">
      <h3>assignments</h3>
      {{assignments}}
      <div>
        <h2>studentname</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-4" v-for="student in students" :key="student.id">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title text-center">{{student.name}}</h4>
            <div class="row justify-content-between text-center">
              <div class="col-4 p-0">Subject Name</div>
              <div class="col-4 p-0">Assignment</div>
              <div class="col-4 p-0">Complete</div>
            </div>
          </div>
          <assignmentBreakdown :student="student" />
        </div>
      </div>
    </div>
    <assignmentModal />
  </div>
</template>


<script>
import assignmentBreakdown from "../components/AssignmentBreakdown";
import assignmentModal from "../components/AssignmentModal";
export default {
  name: "assignment-component",
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("getAllAssignments");
  },
  computed: {
    students() {
      return this.$store.state.StudentStore.students;
    }
  },
  methods: {},
  components: {
    assignmentModal,
    assignmentBreakdown
  }
};
</script>


<style scoped>
</style>