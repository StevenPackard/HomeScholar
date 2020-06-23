<template>
  <div class="transcript container-fluid">
    <div id="transcript" class="row ">
      <div class="col-12 p-5 mt-5 ">
        <h1 align="center">Transcript for {{ student.name }}</h1>
      </div>
      <div class="col-12">
        <div class="row">
          <div class="col-3 ">Title</div>
          <div class="col-3 ">Subject</div>
          <div class="col-3 ">Description</div>
          <div class="col-3 ">Score</div>
        </div>
      </div>
      <div
        v-for="assignment in assignments"
        :key="assignment.id"
        class="col-12"
      >
        <div class="row">
          <div class="col-3">{{ assignment.title }}</div>
          <div v-if="assignment.title != assignment.subject" class="col-3">
            {{ assignment.subject }}
          </div>
          <div class="col-3">{{ assignment.description }}</div>
          <div v-if="assignment.score" class="col-3">
            Score: {{ assignment.score }}
          </div>
          <div v-if="!assignment.score" class="col-3">Ungraded</div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <button class="btn btn-success" @click="print">Print</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "transcript",
  data() {
    return {
      output: null,
    };
  },
  methods: {
    print() {
      this.$htmlToPaper("transcript");
    },
  },
  computed: {
    student() {
      return this.$store.state.StudentStore.activeStudent;
    },
    assignments() {
      return this.$store.state.AssignmentsStore.assignments
        .filter((a) => a.studentId.id == this.student.id)
        .sort((a, b) => {
          if (a.subject.toLowerCase() > b.subject.toLowerCase()) {
            return 1;
          } else return -1;
        });
    },
  },
  components: {},
};
</script>

<style scoped></style>

new Date(assignment.updatedAt).toLocaleDateString("en-US")
