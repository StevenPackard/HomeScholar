<template>
  <div class="assignment-details-modal row">
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
              <div class="form-group">
                <label for="studentName" class="col-form-label">Student Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="studentName"
                  v-model="addAssignment.name"
                />
              </div>
              <div class="form-group">
                <label for="studentDescription" class="col-form-label">Description</label>
                <textarea
                  class="form-control"
                  id="studentDescription"
                  v-model="addAssignment.description"
                ></textarea>
              </div>
              <div class="form-group">
                <label for="studentGrade" class="col-form-label">Grade</label>
                <input
                  class="form-control"
                  id="studentGrade"
                  type="number"
                  v-model="addAssignment.gradeLevel"
                />
              </div>
              <div class="form-group">
                <label for="studentSubjects" class="col-form-label">Subjects (Optional)</label>
                <input
                  class="form-control"
                  id="studentSubjects"
                  type="text"
                  v-model="addAssignment.subjects"
                />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="submitNewStudent">Add Student</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "assignment-details-modal",
  data() {
    return {
      addAssignments: {}
    };
  },
  computed: {},
  methods: {},
  components: {}
};
</script>


<style scoped>
</style>