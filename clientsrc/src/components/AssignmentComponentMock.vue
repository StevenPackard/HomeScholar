<template>
  <li
    v-if="showAll"
    @click="setActiveAssignmentDetails"
    :id="assignment.id"
    draggable="true"
    class="assignment-component-mock p-0 col-12 text-center rounded border border-dark my-1 action p-2 drag-item"
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
          <h5 class>{{ assignment.score || assignment.passed }}</h5>
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
      showAll: true,
      assignmentString: JSON.stringify({
        title: this.assignment.title,
        duration: "02:00",
        id: this.assignment.id,
        backgroundColor: this.assignment.backgroundColor,
      }),
    };
  },
  computed: {},
  mounted() {
    let draggableElement = document.getElementById(this.assignment.id);
    new Draggable(draggableElement);
    // this.createDraggable;
  },
  methods: {
    setActiveAssignmentDetails() {
      this.$store.commit("setActiveAssignmentDetails", this.assignment.id);
    },

    dragging() {
      console.log("dragging");
    },
    // createDraggable() {

    // }
  },
  components: {},
  props: ["assignment"],
};
</script>

<style scoped>
.assignment-component-mock {
  height: 5vh;
}
.action {
  cursor: pointer;
}
</style>
