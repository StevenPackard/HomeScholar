<template>
  <div class="dashboard container-fluid">
    <div class="row">
      <!-- <timeline /> -->
      <div class="col-9 max-height">
        <Fullcalendar
          defaultView="timeGridDay"
          :plugins="calendarPlugins"
          :header="{
            left: 'title',
            center: 'dayGridMonth, timeGridWeek, timeGridDay, listWeek',
            right: 'prev today next',
          }"
        />
      </div>
      <div class="col-3 ">
        <div class="row">
          <assignment />
        </div>
      </div>
    </div>
    <div class="row">
      <assignment />
    </div>
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

export default {
  name: "dashboard",
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
  computed: {},
  methods: {},
  components: {
    timeline,
    assignment,
    Fullcalendar,
  },
};
</script>

<style scoped>
.max-height {
  max-height: 100vh;
}
</style>
