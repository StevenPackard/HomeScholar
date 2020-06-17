<template>
  <div class="assignment-breakdown">
    <div class="row">{{assignments}}</div>
  </div>
</template>


<script>
export default {
  name: "assignment-breakdown",
  data() {
    return {};
  },
  props: ["student"],
  computed: {
    assignments() {
      return this.$store.state.AssignmentsStore.assignments;
    }
  },
  methods: {
    getAssignments() {
      return this.assignments.filter(a => {
        a.studentId == this.student.id;
      });
    }
  },
  components: {}
};
</script>


<style scoped>
</style>