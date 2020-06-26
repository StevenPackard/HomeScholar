<template>
  <div
    :style="background"
    class="student-mock-component col-12 my-3 shadow rounded color"
    :class="{ solo: students.length < 2 }"
  >
    <div class="row text-center justify-content-center">
      <div class="col-12">
        <router-link :to="{ path: `/student/${student.id}` }">
          <h4>
            {{ student.name }}
            <i class="fas fa-school mx-4"></i>
            Grade Level - {{ student.gradeLevel }}
          </h4>
        </router-link>
        <span>Hide Graded</span>
        <input class="btn btn-warning" type="checkbox" checked @click="filtered = !filtered" />
      </div>
      <div class="col-7 border-bottom border-dark">
        <h5 v-if="!filtered">Unscheduled Assignments</h5>
        <h5 v-if="filtered">All Assignments</h5>
      </div>
    </div>
    <div
      class="row assignment-box justify-content-center mt-2"
      :class="{ soloAssigns: students.length < 2 }"
    >
      <ol v-if="filtered" class="col-11">
        <AssignmentComponentMock
          v-for="assignment in assignments"
          :key="assignment.id"
          :assignment="assignment"
        />
      </ol>
      <ol v-if="!filtered" class="col-11">
        <AssignmentComponentMock
          v-for="assignment in filteredAssignments"
          :key="assignment.id"
          :assignment="assignment"
        />
      </ol>
    </div>
  </div>
</template>

<script>
import AssignmentComponentMock from "../components/AssignmentComponentMock";
import AddAssignmentModal from "../components/AssignmentModal";
export default {
  name: "student-mock",
  data() {
    return {
      filtered: false,
      background: "background-color:" + this.student.backgroundColor + ";"
      // soloStudent: this.students.length == 1 ? true : false
    };
  },
  mounted() {
    this.$store.dispatch("getAssignmentsForDashboard", this.student.id);
  },
  computed: {
    assignments() {
      return this.$store.state.AssignmentsStore.assignments.filter(
        a => a.studentId.id == this.student.id
      );
    },
    filteredAssignments() {
      return this.scheduledAssignments.filter(assignment => !assignment.score);
    },
    scheduledAssignments() {
      return this.assignments.filter(assignment => assignment.start == null);
    },
    students() {
      return this.$store.state.StudentStore.students;
    }

    //   return this.$store.state.AssignmentsStore.ActiveAssignmentsbyStudentId[
    //     this.student.id
    //   ];
    // }
  },
  methods: {},
  components: {
    AddAssignmentModal,
    AssignmentComponentMock
  },
  props: ["student", "studentsLength"]
};
</script>

<style scoped>
.student-mock-component {
  height: 37vh;
}
.assignment-box {
  height: 25vh;
  overflow-y: auto;
  overflow-x: hidden;
}
:root {
  --Bcolor: red;
}
.color {
  background-color: var(--Bcolor);
}
.solo {
  height: 70vh;
}
.soloAssigns {
  height: 55vh;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
