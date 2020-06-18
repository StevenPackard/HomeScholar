<template>
  <div
    @click="setActiveAssignmentDetails"
    class="assignment-component-mock col-11 text-center bg-light my-3 action"
  >
    <div data-toggle="modal" data-target="#assignmentDetailsModal" class="">
      <div class="row">
        <div class="col-4">
          <h3>{{ assignment.subject }}</h3>
        </div>
        <div class="col-4">
          <h3>{{ assignment.title }}</h3>
        </div>
        <div class="col-4">
          <h3>{{ assignment.passed }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "assignment-component-mock",
  data() {
    return {};
  },
  computed: {},
  methods: {
    setActiveAssignmentDetails() {
      console.log("hi");

      this.$store.commit("setActiveAssignmentDetails", this.assignment.id);
    },
  },
  components: {},
  props: ["assignment"],
};
</script>

<style scoped></style>
