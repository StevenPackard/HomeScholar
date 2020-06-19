<template>
  <div class="dashboard container-fluid">
    <div class="row push-down">
      <!-- <timeline /> -->
      <div class="col-8 max-height">
        <Fullcalendar
          ref="Fullcalendar"
          height="parent"
          defaultView="timeGridDay"
          :plugins="calendarPlugins"
          :selectable="true"
          @select="handleSelect"
          :events="assignments"
          :editable="true"
          @drop="handleDrop"
          @eventDrop="handleUpdate"
          @eventResize="handleUpdate"
          @eventClick="setActiveAssignmentDetails"
          @dateClick="goToDate"
          :droppable="true"
          :header="{
            center: 'title',
            left: 'dayGridMonth, timeGridWeek, timeGridDay, listWeek',
            right: 'prev today next',
          }"
        />
      </div>
      <div id="draggableContainer" class="col-4 max-height overflow-y">
        <div class="row mr-1">
          <button
            data-toggle="modal"
            data-target="#addAssignmentModal"
            class="btn btn-success"
          >
            add assignment
          </button>
          <!-- <assignment /> -->
          <student
            v-for="student in students"
            :key="student.id"
            :student="student"
          />
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
    console.log(document.getElementsByClassName("drag-item"), "from mounted");
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
        ListPlugin,
      ],
    };
  },
  computed: {
    students() {
      return this.$store.state.StudentStore.students;
    },
    assignments() {
      return this.$store.state.AssignmentsStore.assignments;
    },
    activeAssignments() {
      return this.$store.state.AssignmentsStore.activeAssginemnts;
    },

    events() {
      return this.$store.state.events;
    },
  },
  methods: {
    handleSelect(arg) {
      console.log(arg);
      console.log("this is the type", arg.view.type);
      if (arg.view.type != "dayGridMonth") {
        let newElements = {
          start: "<p id='start-element'> Start: " + arg.start + " </p>",
          end: "<p id='end-element'> End: " + arg.end + " </p>",
          allDay:
            "<p id='allday-element'> All Day: " +
            (arg.allDay ? "Yes" : "No") +
            " </p>",
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
      }
    },
    handleDrop(arg) {
      let endDate = new Date(arg.date);
      endDate.setHours(endDate.getHours() + 2);

      let newElements = {
        start: arg.date,
        end: endDate,
        allDay: arg.allDay,
        assignmentId: arg.draggedEl.id,
      };

      this.$store.dispatch("updateAssignment", newElements);
    },
    handleUpdate(arg) {
      let newElements = {
        start: arg.event.start,
        end: arg.event.end,
        assignmentId: arg.event.id,
      };
      this.$store.dispatch("updateAssignment", newElements);
    },
    setActiveAssignmentDetails(arg) {
      this.$store.commit("setActiveAssignmentDetails", arg.event.id);
      $("#assignmentDetailsModal").modal("toggle");
    },
    goToDate(arg) {
      this.$refs.Fullcalendar.getApi().changeView("timeGridDay", arg.date);
      console.log("from gotodate");
    },
  },
  components: {
    timeline,
    assignment,
    Fullcalendar,
    student,
  },
};
</script>

<style scoped>
.max-height {
  height: 87vh;
}
.overflow-y {
  overflow-y: auto;
}

.push-down {
  margin-top: 5rem;
}

/* .timeline-box {
  height: 50vh;
} */
/* .students-box {
  height: 37vh;
  overflow-y: auto;
} */
</style>
