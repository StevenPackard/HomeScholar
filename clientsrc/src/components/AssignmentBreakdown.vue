<template>
  <div class="assignment-breakdown">
    <div class="row"></div>
  </div>
</template>


<script>
export default {
  name: "assignment-breakdown",
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("getAssignments", student);
  },
  props: ["student"],
  computed: {
    assignments() {
      return this.$store.state.AssignmentsStore.assignments;
    }
  },
  methods: {},
  components: {}
};
</script>


<style scoped>
</style>