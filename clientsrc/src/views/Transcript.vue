<template>
  <div class="transcript container-fluid">
    <div class="row">
      <div class="col-12 pt-5 mt-5">
        <input @change="showFullTranscript = !showFullTranscript" type="checkbox" />
        <p class="d-inline">Full transcript</p>
      </div>
    </div>
    <div id="transcript" class="row">
      <div class="col-12 p-5 mt-5">
        <h1 align="center">HomeScholar Transcript for {{ student.name }}</h1>
      </div>
      <transcriptSummary v-if="!showFullTranscript" />
      <transcriptAll :assignments="assignments" v-else />
    </div>

    <div class="row">
      <div class="col-12 m-auto">
        <button class="btn btn-success" @click="print">Print</button>
      </div>
    </div>
  </div>
</template>

<script>
import transcriptAll from "../components/transcriptAll";
import transcriptSummary from "../components/transcriptSummary";
export default {
  name: "transcript",
  data() {
    return {
      showFullTranscript: false,
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
  components: {
    transcriptAll,
    transcriptSummary
  }
};
</script>

<style scoped></style>

new Date(assignment.updatedAt).toLocaleDateString("en-US")
