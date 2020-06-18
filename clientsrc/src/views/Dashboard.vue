<template>
  <div class="dashboard container-fluid">
    <div class="row">
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
          :header="{
            center: 'title',
            left: 'dayGridMonth, timeGridWeek, timeGridDay, listWeek',
            right: 'prev today next',
          }"
        />
      </div>
      <div class="col-4">
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
import InteractionPlugin from "@fullcalendar/interaction";
import ListPlugin from "@fullcalendar/list";

import student from "../components/StudentMock";

export default {
  name: "dashboard",
  mounted() {
    this.$store.dispatch("getAllAssignments");
  },
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
      // $("#addAssignmentModal").modal("toggle");
      // this.$store.dispatch("addEvent", arg);
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
