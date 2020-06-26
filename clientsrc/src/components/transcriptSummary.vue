<template>
  <div class="col-12 text-center">
    <div class="row">
      <div class="col-12">
        <div class="row justify-content-center mb-2">
          <div class="col-6 border">Subject</div>
          <div class="col-6 border">Score</div>
        </div>
      </div>
    </div>
    <div
      class="row"
      v-for="(value, name, index) in transcriptData"
      :key="index"
    >
      <div class="col-12">
        <div class="row justify-content-center">
          <div class="col-6 border">
            {{ name[0].toUpperCase() + name.slice(1) }}
          </div>
          <div class="col-6 border">{{ Math.ceil(value) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {},
  props: ["assignments"],
  computed: {
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
      console.log(subjectObj);
      let keys = Object.keys(subjectObj);
      let avgObj = {};
      for (let i = 0; i < keys.length; i++) {
        avgObj[keys[i]] =
          subjectObj[keys[i]].reduce((a, b) => a + b, 0) /
          subjectObj[keys[i]].length;
      }
      return avgObj;
    },
  },
};
</script>

<style></style>
