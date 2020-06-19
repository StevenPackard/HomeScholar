<template>
  <div class="dashboard container-fluid">
    <div class="row push-down">
      <!-- <timeline /> -->
      <div class="col-8 max-height">
        <Fullcalendar
          height="parent"
          defaultView="timeGridDay"
          :plugins="calendarPlugins"
          :selectable="true"
          @select="handleSelect"
          :events="assignments"
          :editable="true"
          @drop="handleDrop"
          @eventDrop="handleDrop"
          :droppable="true"
          :header="{
            center: 'title',
            left: 'dayGridMonth, timeGridWeek, timeGridDay, listWeek',
            right: 'prev today next',
          }"
        />
      </div>
      <div id="draggableContainer" class="col-4 max-height overflow-y">
        <div class="row">
          <button
            data-toggle="modal"
            data-target="#addAssignmentModal"
            class="btn btn-success"
          >add assignment</button>
          <!-- <assignment /> -->
          <student v-for="student in students" :key="student.id" :student="student" />
        </div>
      </div>
    </div>
    <!-- <div class="row justify-content-center mt-4">
      <div class="col-12 shadow">

        <div class="row justify-content-center students-box bg-info">
          <student
            v-for="student in students"
            :key="student.id"
            :student="student"
          />
        </div>

      </div>
    </div>-->
  </div>
</template>

<script>
import timeline from "../components/TimelineComponent";
import assignment from "../components/AssignmentComponent";

require("@fullcalendar/core/main.min.css");
require("@fullcalendar/daygrid/main.min.css");
require("@fullcalendar/timegrid/main.min.css");

import Fullcalendar from "@fullcalendar/vue";
import DayGridPlugin from "@fullcalendar/daygrid";
import TimeGridPlugin from "@fullcalendar/timegrid";
import InteractionPlugin, { Draggable } from "@fullcalendar/interaction";
import ListPlugin from "@fullcalendar/list";

import student from "../components/StudentMock";

export default {
  name: "dashboard",
  mounted() {
    this.$store.dispatch("getAllAssignments");
    console.log(document.getElementsByClassName("drag-item"));
    console.log(document.getElementById("draggableContainer"));
  },
  // updated() {
  //   let draggableElement = document.getElementById("draggableContainer");
  //   new Draggable(draggableElement, { itemSelector: ".drag-item" });
  // },
  data() {
    return {
      calendarPlugins: [
        DayGridPlugin,
        TimeGridPlugin,
        InteractionPlugin,
        ListPlugin
      ]
    };
  },
  computed: {
    students() {
      return this.$store.state.StudentStore.students;
    },
    assignments() {
      return this.$store.state.AssignmentsStore.assignments;
    },

    events() {
      return this.$store.state.events;
    }
  },
  methods: {
    handleSelect(arg) {
      console.log(arg);
      let newElements = {
        start: "<p id='start-element'> Start: " + arg.start + " </p>",
        end: "<p id='end-element'> End: " + arg.end + " </p>",
        allDay:
          "<p id='allday-element'> All Day: " +
          (arg.allDay ? "Yes" : "No") +
          " </p>"
      };
      $("#addAssignmentForm").append(
        newElements.start,
        newElements.end,
        newElements.allDay
      );
      $("#addAssignmentModal").attr("data-start", arg.start);
      $("#addAssignmentModal").attr("data-end", arg.end);
      $("#addAssignmentModal").attr("data-allDay", arg.allday);
      $("#addAssignmentModal").modal("toggle");
    },
    handleDrop(arg) {
      console.log(arg);
    }
  },
  components: {
    timeline,
    assignment,
    Fullcalendar,
    student
  }
};
</script>

<style scoped>
.max-height {
  height: 87vh;
}
.overflow-y {
  overflow-y: auto;
}

.fc {
  /* background-color: red; */
}

.fc-day {
  /* background-color: hotpink; */
}

/* .timeline-box {
  height: 50vh;
} */
/* .students-box {
  height: 37vh;
  overflow-y: auto;
} */
</style>
