<template>
  <div class="transcript container-fluid">
    <div class="row">
      <div class="col-12 pt-5 mt-5">
        <input @change="showFullTranscript = !showFullTranscript" type="checkbox" />
        <p class="d-inline">Full transcript</p>
      </div>
      <div class="col-12 text-dark text-center">
        <p>Highlighted Information can be changed on this page, but will not be saved. The highlight will not show up on the actual printed page. If you don't want a highlighted option just leave it blank. Print before leaving to have for your records</p>
      </div>
    </div>
    <div id="transcript" class="row">
      <div style="background-color: black" class="col-12">
        <h3 class="text-light" align="center">Official transcript</h3>
      </div>
      <div class="col-12">
        <h1 align="center">
          <span class="bg-warning" v-if="!form" @click="form = !form">{{ school }}</span>
          <span v-if="form">
            <input v-model="school" type="text" />
            <button @click="form = !form" class="btn btn-success">change</button>
          </span>
          Transcript for
          <span
            v-if="!Nform"
            @click="Nform = !Nform"
            class="bg-warning"
          >{{ student.name }}</span>
          <span v-if="Nform">
            <input v-model="student.name" type="text" />
            <button @click="Nform = !Nform" class="btn btn-success">change</button>
          </span>
        </h1>
        <h3 align="center">Grade: {{ student.gradeLevel }}</h3>
        <h5>Curriculum:</h5>
        <p>{{student.description}}</p>
        <h5>Birth Date:</h5>
        <p class="bg-warning size" @click="Dform = !Dform" v-if="!Dform">{{birth}}</p>
        <span v-if="Dform">
          <input v-model="birth" type="text" />
          <button @click="Dform = !Dform" class="btn btn-success">change</button>
        </span>
      </div>
      <transcriptSummary v-if="!showFullTranscript" :assignments="assignments" />
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
      Dform: false,
      birth: "01 / 01 / 1999",
      Nform: false
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

<style scoped>
.size {
  max-width: 10em;
}
</style>

new Date(assignment.updatedAt).toLocaleDateString("en-US")
