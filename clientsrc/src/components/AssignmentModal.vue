<template>
  <!-- //#region -->
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
      <div class="modal-dialog modal-lg modal-dialog-center" role="document">
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
              <span @click="removeDatePars" aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form id="addAssignmentForm">
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
    <!-- # Add Student Modal  -->
    <div
      class="modal fade"
      id="addStudentModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="addStudentModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg modal-dialog-center" role="document">
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

    <!--SECTION ASSIGNMENT DETAILS MODAL -->
    <div
      class="modal fade"
      id="assignmentDetailsModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="addStudentModalLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-xl modal-dialog-center text-center"
        role="document"
      >
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
                  <small>Title:</small>
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="assignmentTitle"
                  placeholder
                  v-model="assignment.title"
                />
              </div>
              <div class="form-group">
                <label for="studentName" class="col-form-label">
                  <small>Subject</small>
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="assignmentSubject"
                  placeholder
                  v-model="assignment.subject"
                />
              </div>
              <div class="form-group">
                <label for="studentDescription" class="col-form-label">
                  <small>Desctription:</small>
                </label>
                <textarea
                  class="form-control"
                  id="assignmentDescription"
                  v-model="assignment.description"
                ></textarea>
              </div>
              <div class="form-group">
                <label for="studentGrade" class="col-form-label">Score</label>
                <input
                  class="form-control"
                  id="assignmentScore"
                  type="number"
                  v-model="assignment.score"
                />
              </div>
            </form>
          </div>
          <div class="d-flex justify-content-center p-4">
            <button
              type="button"
              class="btn btn-primary mx-2"
              data-dismiss="modal"
              @click="editAssignment"
            >
              Save
            </button>
            <button
              type="button"
              class="btn btn-secondary mx-2"
              data-dismiss="modal"
              @click="showDeleteAssignmentAlert"
            >
              Delete
            </button>
          </div>
          <div class="form-group p-3">
            <label for="studentGrade" class="col-form-label">Note</label>
            <textarea
              class="form-control"
              id="assginmentNote"
              type="number"
              v-model="assignment.note"
            />
          </div>
        </div>
      </div>
    </div>

    <!--!SECTION -->

    <!-- SECTION EDIT STUDENT MODAL -->
    <div
      class="modal fade"
      id="editStudentModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="editStudentModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg modal-dialog-center" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editStudentModalLabel">Edit Student</h5>
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
                  id="editstudentName"
                  v-model="student.name"
                />
              </div>
              <div class="form-group">
                <label for="studentDescription" class="col-form-label"
                  >Description</label
                >
                <textarea
                  class="form-control"
                  id="editStudentDescription"
                  v-model="student.description"
                ></textarea>
              </div>
              <div class="form-group">
                <label for="studentGrade" class="col-form-label">Grade</label>
                <input
                  class="form-control"
                  id="editStudentGrade"
                  type="number"
                  v-model="student.gradeLevel"
                />
              </div>
              <div class="form-group">
                <label for="studentSubjects" class="col-form-label"
                  >Subjects (Optional)</label
                >
                <input
                  class="form-control"
                  id="editStudentSubjects"
                  type="text"
                  v-model="student.subjects"
                />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-primary"
              data-dismiss="modal"
              @click="editStudent"
            >
              edit Student
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- !SECTION -->

    <!-- SECTION EDIT POST MODAL -->
    <div
      class="modal fade"
      id="editPost"
      tabindex="-1"
      role="dialog"
      aria-labelledby="editPostLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg modal-dialog-center" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editPostLabel">Edit Post</h5>
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
                <label for="postTitle" class="col-form-label">Title</label>
                <input
                  type="text"
                  class="form-control"
                  id="editPostTitle"
                  v-model="post.title"
                />
              </div>
              <div class="form-group">
                <label for="postBody" class="col-form-label">Body</label>
                <textarea
                  class="form-control"
                  id="editpostBody"
                  v-model="post.body"
                ></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-primary"
              data-dismiss="modal"
              @click="editPost"
            >
              Save
            </button>
            <button
              type="button"
              class="btn btn-danger"
              data-dismiss="modal"
              @click="deletePost"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- !SECTION -->
    <!-- SECTION ADD COMMENT MODAL -->
    <!-- SECTION ADD POST MODAL -->
    <div
      class="modal fade"
      id="addPost"
      tabindex="-1"
      role="dialog"
      aria-labelledby="editPostLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg modal-dialog-center" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editPostLabel">New Post</h5>
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
                <label for="postTitle" class="col-form-label">Title</label>
                <input
                  type="text"
                  class="form-control"
                  id="editPostTitle"
                  v-model="postForm.title"
                />
              </div>
              <div class="form-group">
                <label for="postBody" class="col-form-label">Body</label>
                <textarea
                  class="form-control"
                  id="editpostBody"
                  v-model="postForm.body"
                ></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-primary"
              data-dismiss="modal"
              @click="addPost"
            >
              Post
            </button>
            <!-- <button type="button" class="btn btn-danger" data-dismiss="modal" @click="close">Cancel</button> -->
          </div>
        </div>
      </div>
    </div>
    <!-- !SECTION  -->
    <!-- !SECTION  -->
    <!-- SECTION EDIT COMMENT MODAL -->
    <div
      class="modal fade"
      id="editComment"
      tabindex="-1"
      role="dialog"
      aria-labelledby="editCommentLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg modal-dialog-center" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editCommentLabel">Edit Comment</h5>
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
                <label for="studentName" class="col-form-label">Body</label>
                <input
                  type="text"
                  class="form-control"
                  id="editstudentName"
                  v-model="comment.body"
                />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-primary"
              data-dismiss="modal"
              @click="editComment"
            >
              Save
            </button>
            <button
              type="button"
              class="btn btn-danger"
              data-dismiss="modal"
              @click="deleteComment"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
    <!--!SECTION  -->
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
      postForm: {},
    };
  },
  computed: {
    assignment() {
      return this.$store.state.AssignmentsStore.activeAssignmentDetails;
    },
    students() {
      return this.$store.state.StudentStore.students;
    },
    student() {
      return this.$store.state.StudentStore.activeStudent;
    },
    comment() {
      return this.$store.state.CommentsStore.activeComment;
    },
    post() {
      return this.$store.state.PostsStore.activePost;
    },
  },
  methods: {
    editPost() {
      this.$store.dispatch("editPost", this.post);
    },
    deletePost() {
      this.$store.dispatch("deletePost", this.post);
      // if user is on post details it reroutes them to the main post page
      if (this.$route.params.id) {
        this.$router.push("/posts");
        return;
      }
    },
    addPost() {
      this.$store.dispatch("addPost", this.postForm);
    },
    editComment() {
      this.$store.dispatch("editComment", this.comment);
    },
    deleteComment() {
      this.$store.dispatch("deleteComment", this.comment);
    },
    showDeleteAssignmentAlert() {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this assignment!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          // swal("List deleted!", {
          //   icon: "success",
          // });
          this.deleteAssignment();
        }
      });
    },
    deleteAssignment() {
      this.$store.dispatch("deleteAssignment", this.assignment);
    },
    editAssignment() {
      this.$store.dispatch("editAssignment", this.assignment);
    },
    submitNewStudent() {
      let subjects = this.addStudent.subjects.split(", ");
      if (subjects) {
        this.addStudent.subjects = subjects;
      }
      this.$store.dispatch("addStudent", { ...this.addStudent });
      this.addStudent = {};
      $("#addStudentModal").modal("hide");
    },
    removeDatePars() {
      if (document.getElementById("start-element")) {
        document.getElementById("start-element").remove();
        document.getElementById("end-element").remove();
        document.getElementById("allday-element").remove();
      }
    },
    addNewAssignment() {
      let foundStudent = this.$store.state.StudentStore.students.find(
        (s) => s.name == this.assignmentForm.name
      );
      this.assignmentForm.studentId = foundStudent.id;

      let addAssignmentData = document.getElementById("addAssignmentModal");

      this.assignmentForm.start = addAssignmentData.dataset.start
        ? addAssignmentData.dataset.start
        : "";
      this.assignmentForm.end = addAssignmentData.dataset.end
        ? addAssignmentData.dataset.end
        : "";
      this.assignmentForm.allDay = addAssignmentData.dataset.allday
        ? addAssignmentData.dataset.allday
        : false;

      this.$store.dispatch("addAssignment", { ...this.assignmentForm });
      this.assignmentForm = { studentId: "" };
      if (document.getElementById("start-element")) {
        document.getElementById("start-element").remove();
        document.getElementById("end-element").remove();
        document.getElementById("allday-element").remove();
      }
    },
    editStudent() {
      let subjects = this.student.subjects.split(",");
      if (subjects) {
        this.student.subjects = subjects;
      }

      this.$store.dispatch("editStudent", this.student);
    },
  },
  components: {},
};
</script>
