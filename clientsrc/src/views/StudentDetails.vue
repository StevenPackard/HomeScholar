<template>
  <div class="student-details container-fluid push-down-less bg-image">
    <div class="row justify-content-center">
      <div class="col-12 mt-2">
        <div class="row text-center mt-4 opacity justify-content-center">
          <div
            class="col-md-8 col-12 rounded-top opacity border-dark border-top border-left border-right justify-content-center"
            :style="{ 'background-color': this.student.backgroundColor }"
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
            class="col-md-8 col-12 text-left description-box bg-light opacity rounded-bottom shadow border-dark border-left border-right border-bottom"
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
        <router-link :to="{ name: 'transcript' }" class="nav-link text-shadow">
          <b>Transcript</b>
        </router-link>
        <div
          class="row bg-warning opacity rounded-top mt-2 border-dark border-top border-left border-right justify-content-center mx-md-2"
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
          class="row mx-md-2 bg-light justify-content-center border-left opacity border-right border-bottom border-dark rounded-bottom min shadow"
        >
          <ol class="col-12 ml-3 pl-4">
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
    // this.$store.dispatch("getStudentById", this.$route.params.id);
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
      return this.$store.state.AssignmentsStore.assignments
        .filter((a) => !("studentId" in a) == false)
        .filter((a) => a.studentId.id == this.student.id);
    },
  },
  methods: {
    showDeleteStudentAlert() {
      swal({
        title: "Are you sure?",
        text:
          "Once deleted, you will not be able to recover this Student! You can archive this student to keep using the transcript",
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
.bg-image {
  background-image: url(../assets/pencilCup.jpg);
  background-repeat: repeat;
  background-size: cover;
}
.opacity {
  opacity: 0.9;
}
a {
  color: white;
}
a:hover {
  color: #ffce67;
}
.size {
  max-width: 5 em;
}
</style>
