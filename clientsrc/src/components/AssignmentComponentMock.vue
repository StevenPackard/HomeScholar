<template>
  <div
    @click="setActiveAssignmentDetails"
    class="assignment-component-mock col-11 text-center bg-light my-3 action p-2"
  >
    <div data-toggle="modal" data-target="#assignmentDetailsModal" class>
      <div class="row">
        <div class="col-4">
          <h5>{{ assignment.subject }}</h5>
        </div>
        <div class="col-4">
          <h5>{{ assignment.title.slice(0,10) }}</h5>
        </div>
        <div class="col-4">
          <h5>{{ assignment.passed }}</h5>
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
    }
  },
  components: {},
  props: ["assignment"]
};
</script>

<style scoped>
.assignment-component-mock {
  max-height: 7vh;
}
</style>
