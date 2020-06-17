<template>
  <div class="assignment-component col">
    <div class="bg-light shadow mt-5">
      <h3>assignments</h3>
      {{assignments}}
      <div>
        <h2>studentname</h2>
      </div>
    </div>
    <assignmentModal />
  </div>
</template>


<script>
import assignmentModal from "../components/AssignmentModal";
export default {
  name: "assignment-component",
  data() {
    return {};
  },
  mount() {
    this.$store.dispatch("getAssignments");
  },
  computed: {
    assignments() {
      return this.$store.state.AssignmentsStore.assignments;
    }
  },
  methods: {},
  components: {
    assignmentModal
  }
};
</script>


<style scoped>
</style>