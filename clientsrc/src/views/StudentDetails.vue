<template>
  <div class="student-details container-fluid push-down-less bg-light">
    <div class="row justify-content-center">
      <div class="col-12 mt-2">
        <div class="row text-center mt-4 justify-content-center">
          <div
            class="col-md-8 col-12 bg-info rounded-top border-dark border-top border-left border-right justify-content-center"
          >
            <h4 class="d-inline">
              {{ student.name }}
              <i class="fas fa-school mx-4"></i>
              Grade Level - {{ student.gradeLevel }}
            </h4>
            <i
              type="button"
              data-toggle="modal"
              data-target="#editStudentModal"
              class="fa fa-pencil pencil text-warning text-shadow"
              aria-hidden="true"
            ></i>
          </div>

          <div
            class="col-md-8 col-12 text-left description-box rounded-bottom shadow border-dark border-left border-right border-bottom"
          >
            <h5>{{ student.description }}</h5>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-md-4 col-12 text-center">
            <button
              data-toggle="modal"
              data-target="#addAssignmentModal"
              class="btn btn-info btn-outline-dark mt-3 shadow"
            >
              Add Assignment
            </button>
            <button
              @click="showDeleteStudentAlert"
              class="btn btn-danger btn-outline-dark mt-3 ml-2 shadow"
            >
              Delete Student
            </button>
          </div>
        </div>
        <router-link :to="{ name: 'transcript' }" class="nav-link">
          <b>Transcript</b>
        </router-link>
        <div
          class="row bg-warning rounded-top mt-2 border-dark border-top border-left border-right justify-content-center mx-md-2"
        >
          <div class="col-12 mt-2">
            <div class="row text-center">
              <div class="col-4">
                <h4>Subject</h4>
              </div>
              <div class="col-4">
                <h4>Assignment Name</h4>
              </div>
              <div class="col-4">
                <h4>Grade</h4>
              </div>
            </div>
          </div>
        </div>
        <div
          class="row mx-md-2 justify-content-center border-left border-right border-bottom border-dark rounded-bottom min shadow"
        >
          <ol class="col-12 pl-4">
            <assignmentComponentMock
              v-for="assignment in assignments"
              :key="assignment.id"
              :assignment="assignment"
            />
          </ol>
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
    this.$store.dispatch("getAllAssignments");
  },
  data() {
    return {};
  },
  computed: {
    student() {
      return this.$store.state.StudentStore.activeStudent;
    },
    assignments() {
      return this.$store.state.AssignmentsStore.assignments.filter(
        (a) => a.studentId.id == this.student.id
      );
    },
  },
  methods: {
    showDeleteStudentAlert() {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this Student!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          // swal("List deleted!", {
          //   icon: "success",
          // });
          this.deleteStudent();
        }
      });
    },

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
  height: 90vh;
}
.details-section {
  height: 40vh;
}
.spacer {
  height: 5vh;
}
.assignment-box {
  height: 45vh;
  overflow-y: auto;
  overflow-x: hidden;
}
.push-down-less {
  margin-top: 3rem;
}
.description-box {
  height: 10vh;
}
.overflow-y {
  overflow-y: auto;
  height: 54vh;
}
.pencil {
  position: absolute;
  right: 10px;
  top: 5px;
}
.min {
  min-height: 25vh;
}
.text-shadow {
  text-shadow: 0.5px 0.5px black;
}
</style>
