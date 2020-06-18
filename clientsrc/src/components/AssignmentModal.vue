<template>
  <div class="assignment-modal">
    <!-- Add Assignment Modal -->
    <div
      class="modal fade"
      id="addAssignmentModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="addAssignmentModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-center" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addAssignmentModalLabel">
              Add Assignment
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <select
                v-model="assignmentForm.name"
                class="form-control form-control-sm"
              >
                <option v-for="student in students" :key="student.id">{{
                  student.name
                }}</option>
              </select>
              <div class="form-group">
                <label for="title" class="col-form-label">Title</label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  v-model="assignmentForm.title"
                />
              </div>
              <div class="form-group">
                <label for="Description" class="col-form-label"
                  >Description</label
                >
                <textarea
                  class="form-control"
                  id="Description"
                  v-model="assignmentForm.description"
                ></textarea>
              </div>
              <div class="form-group">
                <label for="subject" class="col-form-label">Subject</label>
                <input
                  class="form-control"
                  id="subject"
                  type="text"
                  v-model="assignmentForm.subject"
                />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              @click="addNewAssignment"
              data-dismiss="modal"
              class="btn btn-primary"
            >
              Add Assignment
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Add Student Modal  -->
    <div
      class="modal fade"
      id="addStudentModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="addStudentModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-center" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addStudentModalLabel">Add Student</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="studentName" class="col-form-label"
                  >Student Name</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="studentName"
                  v-model="addStudent.name"
                />
              </div>
              <div class="form-group">
                <label for="studentDescription" class="col-form-label"
                  >Description</label
                >
                <textarea
                  class="form-control"
                  id="studentDescription"
                  v-model="addStudent.description"
                ></textarea>
              </div>
              <div class="form-group">
                <label for="studentGrade" class="col-form-label">Grade</label>
                <input
                  class="form-control"
                  id="studentGrade"
                  type="number"
                  v-model="addStudent.gradeLevel"
                />
              </div>
              <div class="form-group">
                <label for="studentSubjects" class="col-form-label"
                  >Subjects (Optional)</label
                >
                <input
                  class="form-control"
                  id="studentSubjects"
                  type="text"
                  v-model="addStudent.subjects"
                />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="submitNewStudent"
            >
              Add Student
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- end student modal -->
    <!--  -->
    <div
      class="modal fade "
      id="assignmentDetailsModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="addStudentModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-center text-center" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addStudentModalLabel">
              Assignment Details
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="studentName" class="col-form-label">
                  <small>Title: </small></label
                >
                <input
                  type="text"
                  class="form-control"
                  id="studentName"
                  placeholder=""
                  v-model="assignment.title"
                />
              </div>
              <div class="form-group">
                <label for="studentName" class="col-form-label">
                  <small>Subject </small></label
                >
                <input
                  type="text"
                  class="form-control"
                  id="studentName"
                  placeholder=""
                  v-model="assignment.subject"
                />
              </div>
              <div class="form-group">
                <label for="studentDescription" class="col-form-label">
                  <small>Desctription: </small>
                </label>
                <textarea
                  class="form-control"
                  id="studentDescription"
                  v-model="assignment.description"
                ></textarea>
              </div>
              <div class="form-group">
                <label for="studentGrade" class="col-form-label">Score</label>
                <input
                  class="form-control"
                  id="studentGrade"
                  type="number"
                  v-model="assignment.score"
                />
              </div>
            </form>
          </div>
          <div class="d-flex justify-content-center p-4">
            <button
              type="button"
              class="btn btn-secondary mx-3"
              data-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="submitNewStudent"
            >
              Save
            </button>
          </div>
          <div class="form-group p-3">
            <label for="studentGrade" class="col-form-label">Note</label>
            <textarea
              class="form-control "
              id="studentGrade"
              type="number"
              v-model="assignment.note"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "assignment-modal",
  data() {
    return {
      assignmentForm: {
        studentId: "",
      },
      addStudent: {},
    };
  },
  computed: {
    assignment() {
      return this.$store.state.AssignmentsStore.activeAssignmentDetails;
    },
    students() {
      return this.$store.state.StudentStore.students;
    },
  },
  methods: {
    submitNewStudent() {
      this.$store.dispatch("addStudent", { ...this.addStudent });
      this.addStudent = {};
      $("#addStudentModal").modal("hide");
    },
    addNewAssignment() {
      let foundStudent = this.$store.state.StudentStore.students.find(
        (s) => s.name == this.assignmentForm.name
      );
      this.assignmentForm.studentId = foundStudent.id;
      this.$store.dispatch("addAssignment", { ...this.assignmentForm });
      this.assignmentForm = { studentId: "" };
    },
  },
  components: {},
};
</script>

<style scoped></style>

// title: { type: String, required: true }, // description: { type: String,
required: true }, // subject: { type: String, required: true }, // studentId: {
type: ObjectId, ref: "Student", required: true },
