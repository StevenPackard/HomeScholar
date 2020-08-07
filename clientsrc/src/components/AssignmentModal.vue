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
            <h5 class="modal-title" id="addAssignmentModalLabel">Add Assignment or Event</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span @click="removeDatePars" aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <span>Assignment</span>
            <label class="switch">
              <input @click="eventForm = !eventForm" type="checkbox" />
              <span class="slider round"></span>
            </label>
            <span>Event</span>
            <form v-if="!eventForm" id="addAssignmentForm">
              <select v-model="assignmentForm.name" class="form-control form-control-sm">
                <option v-for="student in students" :key="student.id">{{ student.name }}</option>
              </select>
              <div class="form-group">
                <label for="title" class="col-form-label">Title</label>
                <input type="text" class="form-control" id="title" v-model="assignmentForm.title" />
              </div>
              <div class="form-group">
                <label for="Description" class="col-form-label">Description</label>
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
            <form v-if="eventForm">
              <div class="form-group">
                <label for="postTitle" class="col-form-label">Title</label>
                <input type="text" class="form-control" id="editEventTitle" v-model="event.title" />
              </div>
              <div class="form-group">
                <label for="postBody" class="col-form-label">Body</label>
                <textarea class="form-control" id="editEventBody" v-model="event.body"></textarea>
              </div>
              <div>
                <label for="checkbox">Start time</label>
                <input type="datetime-local" class="form-control" v-model="event.start" />
                <label for="checkbox">End time</label>
                <input
                  type="datetime-local"
                  class="form-control"
                  v-model="event.end"
                  :min="event.start"
                />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              v-if="!eventForm"
              type="button"
              @click="addNewAssignment"
              data-dismiss="modal"
              class="btn btn-primary"
            >Add Assignment</button>
            <button
              v-if="eventForm"
              type="button"
              @click="addNewEvent"
              data-dismiss="modal"
              class="btn btn-primary"
            >Add Event</button>
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
              @click="removeDatePars"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="studentName" class="col-form-label">Student Name</label>
                <input type="text" class="form-control" id="studentName" v-model="addStudent.name" />
              </div>
              <div class="form-group">
                <label for="studentDescription" class="col-form-label">Curriculum</label>
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
                  type="text"
                  v-model="addStudent.gradeLevel"
                />
              </div>
              <div class="form-group">
                <label for="studentSubjects" class="col-form-label">Color</label>
                <input type="color" id="color" v-model="addStudent.backgroundColor" class />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="submitNewStudent">Add Student</button>
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
      <div class="modal-dialog modal-xl modal-dialog-center text-center" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addStudentModalLabel">Assignment Details</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
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
            >Save</button>
            <button
              type="button"
              class="btn btn-secondary mx-2"
              data-dismiss="modal"
              @click="showDeleteAssignmentAlert"
            >Delete</button>
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
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="studentName" class="col-form-label">Student Name</label>
                <input type="text" class="form-control" id="editstudentName" v-model="student.name" />
              </div>
              <div class="form-group">
                <label for="studentDescription" class="col-form-label">Curriculum</label>
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
                  type="text"
                  v-model="student.gradeLevel"
                />
              </div>
              <div class="form-group">
                <label for="studentSubjects" class="col-form-label">Color</label>
                <input type="color" id="color" v-model="student.backgroundColor" class />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-primary"
              data-dismiss="modal"
              @click="editStudent"
            >Edit Student</button>
            <button
              type="button"
              v-if="!student.archived"
              class="btn btn-danger"
              data-dismiss="modal"
              @click="archiveStudent"
            >Archive Student</button>
            <button
              v-if="student.archived"
              type="button"
              class="btn btn-danger"
              data-dismiss="modal"
              @click="archiveStudent"
            >Unarchive Student</button>
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
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="postTitle" class="col-form-label">Title</label>
                <input type="text" class="form-control" id="editPostTitle" v-model="post.title" />
              </div>
              <div class="form-group">
                <label for="postBody" class="col-form-label">Body</label>
                <textarea class="form-control" id="editpostBody" v-model="post.body"></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-primary"
              data-dismiss="modal"
              @click="editPost"
            >Save</button>
            <button
              type="button"
              class="btn btn-danger"
              data-dismiss="modal"
              @click="showDeletePostAlert"
            >Delete</button>
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
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="postTitle" class="col-form-label">Title</label>
                <input type="text" class="form-control" id="editPostTitle" v-model="postForm.title" />
              </div>
              <div class="form-group">
                <label for="postBody" class="col-form-label">Body</label>
                <textarea class="form-control" id="editpostBody" v-model="postForm.body"></textarea>
              </div>
              <label for="checkbox">Event</label>
              <input type="checkbox" id="checkbox" :max="postForm.end" v-model="postForm.isEvent" />
              <div v-if="postForm.isEvent">
                <label for="checkbox">Start time</label>
                <input type="datetime-local" class="form-control" v-model="postForm.start" />
                <label for="checkbox">End time</label>
                <input
                  type="datetime-local"
                  class="form-control"
                  v-model="postForm.end"
                  :min="postForm.start"
                />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="addPost">Post</button>
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
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="studentName" class="col-form-label">Body</label>
                <input type="text" class="form-control" id="editstudentName" v-model="comment.body" />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-primary"
              data-dismiss="modal"
              @click="editComment"
            >Save</button>
            <button
              type="button"
              class="btn btn-danger"
              data-dismiss="modal"
              @click="showDeleteCommentAlert"
            >Delete</button>
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
        backgroundColor: "",
      },
      addStudent: {
        backgroundColor: "#f3969a",
      },
      postForm: {
        isEvent: false,
      },
      eventForm: false,
      event: {},
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
    archiveStudent() {
      this.student.archived = !this.student.archived;
      this.$store.dispatch("editStudent", this.student);
      console.log(`student archived: ${this.student.archived}`);
    },
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
    showDeletePostAlert() {
      swal({
        title: "Delete Post",
        text: "Are you sure you want to delete this post?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          // swal("List deleted!", {
          //   icon: "success",
          // });
          this.deletePost();
        }
      });
    },
    showDeleteCommentAlert() {
      swal({
        title: "Delete Comment",
        text: "Are you sure you want to delete this comment?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          // swal("List deleted!", {
          //   icon: "success",
          // });
          this.deleteComment();
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
      this.$store.dispatch("addStudent", { ...this.addStudent });
      this.addStudent = {
        backgroundColor: "#f3969a",
      };
      $("#addStudentModal").modal("hide");
    },
    removeDatePars() {
      if (document.getElementById("start-element")) {
        document.getElementById("start-element").remove();
        document.getElementById("end-element").remove();
        document.getElementById("allday-element").remove();
        let assignmentForm = document.getElementById("addAssignmentModal");
        assignmentForm.removeAttribute("data-start");
        assignmentForm.removeAttribute("data-end");
        assignmentForm.removeAttribute("data-allday");
      }
    },
    addNewEvent() {
      this.$store.dispatch("addEvent", { ...this.event });
      this.event = {};
    },
    addNewAssignment() {
      let foundStudent = this.$store.state.StudentStore.students.find(
        (s) => s.name == this.assignmentForm.name
      );
      this.assignmentForm.studentId = foundStudent.id;
      this.assignmentForm.backgroundColor = foundStudent.backgroundColor;

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
        let assignmentForm = document.getElementById("addAssignmentModal");
        assignmentForm.removeAttribute("data-start");
        assignmentForm.removeAttribute("data-end");
        assignmentForm.removeAttribute("data-allday");
      }
    },
    editStudent() {
      this.$store.dispatch("editStudent", this.student);
      this.$store.commit("setStudentAssignments", this.student.id);
      this.$store.dispatch("editAssignColor", {
        color: this.student.backgroundColor,
        studentId: this.student.id,
      });
    },
  },
  components: {},
};
</script>
<style>
input[type="color"] {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
}

input[type="color"]::-webkit-color-swatch {
  border: none;
  border-radius: 50%;
  padding: 0;
}

input[type="color"]::-webkit-color-swatch-wrapper {
  border: none;
  border-radius: 50%;
  padding: 0;
}
/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 30px;
  height: 17px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #2196f3;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 13px;
  width: 13px;
  left: 1px;
  bottom: 2px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(13px);
  -ms-transform: translateX(13px);
  transform: translateX(13px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 17px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
