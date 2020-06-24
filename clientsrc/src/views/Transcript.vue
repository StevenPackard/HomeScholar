<template>
  <div class="transcript container-fluid">
    <div id="transcript" class="row">
      <div class="col-12 p-5 mt-5">
        <h1 align="center">Homeschool Transcript for {{ student.name }}</h1>
      </div>
      <div class="col-12">
        <div class="row justify-content-center mb-2">
          <div class="col-2 border">Title</div>
          <div class="col-2 border">Subject</div>
          <div class="col-2 border">Description</div>
          <div class="col-2 border">Score</div>
          <div class="col-2 border">hours</div>
        </div>
      </div>
      <div v-for="assignment in assignments" :key="assignment.id" class="col-12">
        <div v-if="assignment.score">
          <div class="row justify-content-center">
            <div class="col-2 border">{{ assignment.title }}</div>
            <div class="col-2 border">{{ assignment.subject }}</div>
            <div class="col-2 border">{{ assignment.description }}</div>
            <div v-if="assignment.score" class="col-2 border">{{ assignment.score }}</div>
            <div v-if="!assignment.score" class="col-2 border">Ungraded</div>
            <div class="col-2 border">
              {{
              new Date(assignment.end).getUTCHours() -
              new Date(assignment.start).getUTCHours()
              }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <button class="btn btn-success" @click="print">Print</button>
        {{test}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "transcript",
  data() {
    return {
      output: null
    };
  },
  mounted() {
    this.$store.dispatch("getStudentById", this.$route.params.id);
    this.$store.dispatch("getAllAssignments");
  },
  methods: {
    print() {
      this.$htmlToPaper("transcript");
    }
  },
  computed: {
    test() {
      return this.$store.getters.transcriptSummary;
    },
    student() {
      return this.$store.state.StudentStore.activeStudent;
    },
    assignments() {
      return this.$store.state.AssignmentsStore.assignments
        .filter(a => a.studentId.id == this.student.id)
        .sort((a, b) => {
          if (a.subject.toLowerCase() > b.subject.toLowerCase()) {
            return 1;
          } else return -1;
        });
    }
  },
  components: {}
};
</script>

<style scoped></style>

new Date(assignment.updatedAt).toLocaleDateString("en-US")
