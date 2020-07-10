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
        <div class="row" v-for="(value, name, index) in transcriptData" :key="index">
          <div class="col-12">
            <div class="row">
              <div class="col-6 border">{{ name[0].toUpperCase() + name.slice(1) }}</div>
              <div class="col-6 border">{{ Math.ceil(value) }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="row" v-for="(value, name, index) in hours" :key="index">
          <div v-if="value !=0" class="col-12 border">{{ value }}</div>
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
      let assignment = this.assignments.filter(e => e.score >= 0);
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
    hours() {
      let subjectObjHours = {};

      for (let i = 0; i < this.assignments.length; i++) {
        let keys = Object.keys(subjectObjHours);
        for (let j = 0; j <= keys.length; j++) {
          if (keys.includes(this.assignments[i].subject)) {
            subjectObjHours[this.assignments[i].subject].push(
              new Date(this.assignments[i].end).getHours() -
                new Date(this.assignments[i].start).getHours()
            ); //assignments[i].hours
          } else {
            subjectObjHours[this.assignments[i].subject] = [
              new Date(this.assignments[i].end).getHours() -
                new Date(this.assignments[i].start).getHours()
            ];
          }
        }
      }

      let keysHour = Object.keys(subjectObjHours);
      let avgObjHours = {};
      for (let i = 0; i < keysHour.length; i++) {
        avgObjHours[keysHour[i]] = subjectObjHours[keysHour[i]].reduce(
          (a, b) => a + b,
          0
        );
      }
      return avgObjHours;
    }
  }
};
</script>

<style></style>
