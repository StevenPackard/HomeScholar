<template>
  <div class="assignment-modal">
    <button data-toggle="modal" data-target="#addAssignmentModal" class="btn btn-success">Add</button>
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
            <h5 class="modal-title" id="addAssignmentModalLabel">Add Assignment</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <select v-model="assignmentForm.student" class="form-control form-control-sm">
                <option v-for="student in students" :key="student.id">{{student.name}}</option>
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
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button
              type="button"
              @click="addAssignment"
              data-dismiss="modal"
              class="btn btn-primary"
            >Add Assignment</button>
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
      assignmentForm: {}
    };
  },
  computed: {
    students() {
      return this.$store.state.StudentStore.students;
    }
  },
  methods: {
    addAssignment() {
      let studentId = "";
      for (let i = 0; i < this.students.length; i++) {
        if (this.assignmentForm.student == this.students[i].name) {
          studentId = this.students[i].id;
        }
      }
      this.assignmentForm.student.id = studentId;
      this.$store.dispatch("addAssignment", { ...this.assignmentForm });
      this.assignmentForm = {};
    }
  },
  components: {}
};
</script>


<style scoped>
</style>

    // title: { type: String, required: true },
    // description: { type: String, required: true },
    // subject: { type: String, required: true },
    // studentId: { type: ObjectId, ref: "Student", required: true },