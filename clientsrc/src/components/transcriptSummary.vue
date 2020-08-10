<template>
  <div class="col-12 text-center">
    <div class="row">
      <div class="col-12">
        <div class="row mb-2">
          <div class="col-4 border">Subject</div>
          <div class="col-4 border">Score</div>
          <div class="col-4 border">Hours</div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-8">
        <div
          class="row"
          v-for="(value, name, index) in transcriptData"
          :key="index"
        >
          <div class="col-12">
            <div class="row">
              <div class="col-6 border">
                {{ name[0].toUpperCase() + name.slice(1) }}
              </div>
              <div class="col-6 border">{{ Math.ceil(value) }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="row" v-for="(value, name, index) in hours" :key="index">
          <div class="col-12 border">{{ value || "0" }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { duration } from "moment";
export default {
  mounted() {
    this.$store.dispatch("getAssignmentsByStudentId", this.$route.params.id);
  },

  computed: {
    assignments() {
      return this.$store.state.AssignmentsStore.assignments;
    },
    // transcriptData() {
    //   return this.$store.getters.transcriptSummary;
    // }

    transcriptData() {
      let assignment = this.assignments.filter((e) => e.score >= 0);
      let subjectObj = {};
      for (let i = 0; i < assignment.length; i++) {
        let keys = Object.keys(subjectObj);
        for (let j = 0; j <= keys.length; j++) {
          if (keys.includes(assignment[i].subject)) {
            subjectObj[assignment[i].subject].push(assignment[i].score);
          } else {
            subjectObj[assignment[i].subject] = [assignment[i].score];
          }
        }
      }

      let keys = Object.keys(subjectObj);
      let avgObj = {};
      for (let i = 0; i < keys.length; i++) {
        avgObj[keys[i]] =
          subjectObj[keys[i]].reduce((a, b) => a + b, 0) /
          subjectObj[keys[i]].length;
      }
      return avgObj;
    },

    hours() {
      let assignments = this.assignments;
      let dictionary = {};
      for (let i = 0; i < assignments.length; i++) {
        let assignment = assignments[i];
        if (assignment.score) {
          let starting = new Date(assignment.start);
          let startTime = Number(starting.getHours());
          let ending = new Date(assignment.end);
          let endTime = Number(ending.getHours());
          assignment.duration = endTime - startTime;
          dictionary[assignment.subject] = dictionary[assignment.subject] || 0;
          dictionary[assignment.subject] += assignment.duration;
        }
      }
      return dictionary;
    },
  },
};
</script>

<style></style>
