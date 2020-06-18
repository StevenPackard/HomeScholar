<template>
  <div class="dashboard container-fluid">
    <div class="row">
      <!-- <timeline /> -->
      <div class="col-8 max-height">
        <Fullcalendar
          defaultView="timeGridDay"
          :plugins="calendarPlugins"
          :contentHeight="500"
          :selectable="true"
          @select="handleSelect"
          :events="events"
          :editable="true"
          :header="{
            left: 'title',
            center: 'dayGridMonth, timeGridWeek, timeGridDay, listWeek',
            right: 'prev today next',
          }"
        />
      </div>
      <div class="col-4 ">
        <div class="row">
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
        <div class="row justify-content-center students-box bg-info"></div>
      </div>
    </div> -->
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
    this.$store.dispatch("getStudents");
  },
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
    events() {
      return this.$store.state.events;
    },
  },
  methods: {
    handleSelect(arg) {
      console.log(arg);
      this.$store.dispatch("addEvent", arg);
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
  max-height: 50vh;
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
