<template>
  <div class="transcript container-fluid">
    <div class="row">
      <div class="col-12 pt-5 mt-5">
        <input
          @change="showFullTranscript = !showFullTranscript"
          type="checkbox"
        />
        <p class="d-inline">Full transcript</p>
      </div>
      <div class="col-12 text-danger text-center">
        <p>
          Information changed on this page will not be saved. Print before
          leaving to have for your records
        </p>
      </div>
    </div>
    <div id="transcript" class="row">
      <div class="col-12 bg-dark">
        <h3 class="text-light" align="center">Official transcript</h3>
      </div>
      <div class="col-12">
        <h1 align="center">
          <span v-if="!form" @click="form = !form">{{ school }}</span
          ><span v-if="form"
            ><input v-model="school" type="text" />
            <button @click="form = !form" class="btn btn-success">
              change
            </button></span
          >
          Transcript for
          {{ student.name }}
        </h1>
        <h3 align="center">
          {{ student.gradeLevel }}
        </h3>
      </div>
      <transcriptSummary
        v-if="!showFullTranscript"
        :assignments="assignments"
      />
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
      output: null,
      form: false,
      school: "HomeScholar",
    };
  },
  mounted() {
    this.$store.dispatch("getStudentById", this.$route.params.id);
    this.$store.dispatch("getAllAssignments");
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
  components: {
    transcriptAll,
    transcriptSummary,
  },
};
</script>

<style scoped></style>

new Date(assignment.updatedAt).toLocaleDateString("en-US")
