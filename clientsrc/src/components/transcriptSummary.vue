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
    <div class="row" v-for="(value,name, index) in transcriptData" :key="index">
      <div class="col-12">
        <div class="row justify-content-center">
          <div class="col-6 border">{{name}}</div>
          <div class="col-6 border">{{value}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    transcriptData() {
      return this.$store.getters.transcriptSummary;
    }
  }
};
</script>

<style>
</style>