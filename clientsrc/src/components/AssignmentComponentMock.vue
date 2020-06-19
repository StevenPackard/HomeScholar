<template>
  <li
    @click="setActiveAssignmentDetails"
    :id="assignment.id"
    draggable="true"
    class="assignment-component-mock p-0 col-12 text-center border border-dark my-1 action p-2 drag-item"
    :data-event="assignmentString"
  >
    <div data-toggle="modal" data-target="#assignmentDetailsModal" class>
      <div class="row">
        <div class="col-4">
          <h5 class>{{ assignment.subject }}</h5>
        </div>
        <div class="col-4">
          <h5 class>{{ assignment.title.slice(0, 10) }}</h5>
        </div>
        <div class="col-4">
          <h5 class>{{ assignment.passed }}</h5>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import Fullcalendar from "@fullcalendar/vue";
import InteractionPlugin, { Draggable } from "@fullcalendar/interaction";

export default {
  name: "assignment-component-mock",
  data() {
    return {
      assignmentString: JSON.stringify({
        title: this.assignment.title,
        duration: "02:00"
      })
    };
  },
  computed: {},
  mounted() {
    console.log(this.assignment.id);
    let draggableElement = document.getElementById(this.assignment.id);
    console.log(draggableElement);
    new Draggable(draggableElement);
    // this.createDraggable;
  },
  methods: {
    setActiveAssignmentDetails() {
      console.log("hi");

      this.$store.commit("setActiveAssignmentDetails", this.assignment.id);
    },

    dragging() {
      console.log("dragging");
    }
    // createDraggable() {

    // }
  },
  components: {},
  props: ["assignment"]
};
</script>

<style scoped>
.assignment-component-mock {
  height: 5vh;
}
</style>
