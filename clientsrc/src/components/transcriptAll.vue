<template>
  <div class="col-12">
    <div class="row">
      <div class="col-12">
        <div class="row justify-content-center mb-2">
          <div class="col-2 border">Title</div>
          <div class="col-2 border">Subject</div>
          <div class="col-2 border">Description</div>
          <div class="col-2 border">Score</div>
          <div class="col-2 border">hours</div>
        </div>
      </div>
    </div>
    <div class="row">
      <div
        v-for="assignment in assignments"
        :key="assignment.id"
        class="col-12"
      >
        <div v-if="assignment.score">
          <div class="row justify-content-center">
            <div class="col-2 border">{{ assignment.title }}</div>
            <div class="col-2 border">{{ assignment.subject }}</div>
            <div class="col-2 border">{{ assignment.description }}</div>
            <div v-if="assignment.score" class="col-2 border">
              {{ assignment.score }}
            </div>
            <div v-if="!assignment.score" class="col-2 border">Ungraded</div>
            <div class="col-2 border">
              {{
                new Date(assignment.end).getHours() -
                  new Date(assignment.start).getHours()
              }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("getAssignmentsByStudentId", this.$route.params.id);
  },

  computed: {
    assignments() {
      return this.$store.state.AssignmentsStore.assignments;
    },
  },
};
</script>

<style></style>
