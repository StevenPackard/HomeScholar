<template>
  <div class="dashboard container-fluid bg-png bg-light">
    <div class="row push-down">
      <!-- <timeline /> -->
      <div
        class="col-md-8 order-md-1 order-2 col-12 max-height fullcalendar-container"
      >
        <Fullcalendar
          class="rounded shadow "
          id="myCal"
          ref="Fullcalendar"
          height="parent"
          defaultView="timeGridDay"
          :plugins="calendarPlugins"
          :selectable="true"
          :dragRevertDuration="0"
          :events="assignments"
          :editable="true"
          :header="{
            center: 'title',
            left: 'dayGridMonth, timeGridWeek, timeGridDay, listWeek',
            right: 'prev today next',
          }"
          @select="handleSelect"
          @eventReceive="handleReceived"
          @drop="handleDrop"
          @eventDrop="handleUpdate"
          @eventResize="handleUpdate"
          @eventClick="setActiveAssignmentDetails"
          @dateClick="goToDate"
          @eventDragStart="handleDragStart"
          @eventDragStop="handleEventDragStop"
          @datesRender="handleDatesRender"
        />
      </div>
      <div
        id="draggableContainer"
        class="col-md-4 col-12 order-md-2 order-1 max-height overflow-y"
      >
        <!-- NOTE Below is the trash icon.  This is an alternative to dragging to side to remove event -->
        <!-- <i id="event-trash" class="fas fa-trash-alt fa-3x float-left"></i> -->
        <div class="row mr-1 justify-content-center">
          <button
            v-if="students.length > 0"
            data-toggle="modal"
            data-target="#addAssignmentModal"
            class="btn btn-warning btn-outline-dark mt-2 sticky-top mx-2"
          >
            Add Assignment/Event
          </button>

          <!-- view events button -->

          <button
            v-if="eventsToDisplay.length > 0"
            @click="DisplayEvents = !DisplayEvents"
            class="btn btn-warning btn-outline-dark mt-2 mx-2"
          >
            View Events
          </button>
          <!-- student dropdown -->
          <button
            v-if="this.nArchived.length > 1"
            class="dropdown-toggle btn btn-warning btn-outline-dark mt-2 mx-2"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Students
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <p class="p-0 m-0"></p>
            <span v-for="student in nArchived" :key="student.id">
              <a
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
                @click="setActiveStudent(student.id), (showAll = false)"
                type="button"
                class="nav-link"
                >{{ student.name }}</a
              >
            </span>
            <a
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
              @click="showAll = true"
              type="button"
              class="nav-link"
            >
              <b>Show All</b>
            </a>
          </div>
          <div
            class="col-12 bg-primary text-dark rounded opacity shadow mt-3"
            v-if="DisplayEvents"
          >
            <div
              class="d-flex justify-content-between p-1"
              v-for="eventToDisplay in eventsToDisplay"
              :key="eventToDisplay.id"
            >
              <div>
                <span class="p-1">{{ eventToDisplay.title }}</span>
              </div>
              <div>
                <span class="p-1">{{
                  new Date(eventToDisplay.start).toLocaleString().slice(0, 9)
                }}</span>
                <i
                  title="delete event"
                  type="button"
                  @click="deleteEvent(eventToDisplay.id)"
                  class="fas fa-trash action p-1 text-danger"
                ></i>
              </div>
            </div>
          </div>
          <!-- <assignment /> -->
          <div v-if="nArchived.length > 1">
            <div v-if="showAll">
              <student
                v-for="student in nArchived"
                :key="student.id"
                :student="student"
              />
            </div>
            <div v-else>
              <student
                v-show="activeStudent"
                :student="activeStudent"
                :soloDolo="true"
              />
            </div>
          </div>
          <div v-else>
            <student
              v-for="student in nArchived"
              :key="student.id"
              :student="student"
              :soloDolo="true"
            />
          </div>

          <!-- <student v-show="activeStudent" :student="a" /> -->
        </div>
      </div>
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
import InteractionPlugin, { Draggable } from "@fullcalendar/interaction";
import ListPlugin from "@fullcalendar/list";

import student from "../components/StudentMock";

export default {
  name: "dashboard",
  mounted() {
    this.$store.dispatch("getAllAssignments");
    // this.$store.dispatch("getAllEvents");
  },

  data() {
    return {
      calendarPlugins: [
        DayGridPlugin,
        TimeGridPlugin,
        InteractionPlugin,
        ListPlugin,
      ],
      showAll: true,
      DisplayEvents: false,
    };
  },
  computed: {
    eventsToDisplay() {
      return this.$store.state.PostsStore.events;
    },
    students() {
      return this.$store.state.StudentStore.students;
    },
    nArchived() {
      return this.$store.state.StudentStore.students.filter(
        (s) => s.archived == false
      );
    },

    assignments() {
      return this.$store.state.AssignmentsStore.assignments;
    },
    activeStudent() {
      return this.$store.state.StudentStore.activeStudent;
    },
  },
  methods: {
    async deleteEvent(id) {
      await this.$store.dispatch("deleteEvent", id);
      this.$store.dispatch("getAllEvents");
    },
    setActiveStudent(id) {
      this.$store.state.StudentStore.activeStudent = this.$store.state.StudentStore.students.find(
        (s) => s.id == id
      );
    },
    handleReceived(arg) {
      let event = this.$refs.Fullcalendar.getApi().getEventById(arg.event.id);
      // console.log("recieved", arg);
      // event.remove();
      // NOTE We may need to revert this because we still get duplicates
      let events = this.$refs.Fullcalendar.getApi().getEvents();
      console.log(event.id);
      console.log(events);
      for (let i = 0; i < events.length; i++) {
        if (event.id == events[i].id) {
          events[i].remove();
        }
        // console.log(events[i].id);
        // events[i].remove();
      }
    },
    handleDatesRender(arg) {
      // NOTE This function indicates whether the dayView is up on full calendar and returns the day for that day
      // This is the first step for getting assignment just for a chosen day view
      console.log("handle date render");
      console.log(arg.view.type);
      console.log(new Date(arg.view.activeStart).getDate());
      // this.$store.dispatch("updateDashboardAssignment", {
      //   indicator: arg.view.type,
      //   day: day,
      // });
    },
    // handleEventRender(arg) {
    //   let events = this.$refs.Fullcalendar.getApi().getEvents();
    //   // console.log("event render events", events);
    //   let eventIds = [];
    //   for (let i = 0; i < events.length; i++) {
    //     eventIds.push(events[i].id);
    //   }

    //   if (eventIds.includes(arg.event.id)) {
    //     console.log("hello from if");
    //     return false;
    //   }
    // },
    handleDragStart(arg) {
      console.log("drag start");
    },
    handleSelect(arg) {
      console.log(arg);
      // console.log("this is the type", arg.view.type);
      if (this.students.length > 0) {
        if (arg.view.type != "dayGridMonth") {
          let startTimestamp = this.fixTimestamp(arg.startStr);
          let endTimestamp = this.fixTimestamp(arg.endStr);

          let newElements = {
            start: "<p id='start-element'> Start: " + startTimestamp + " </p>",
            end: "<p id='end-element'> End: " + endTimestamp + " </p>",
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
          document.getElementById("eventStart").value = arg.startStr.slice(
            0,
            16
          );
          document.getElementById("eventEnd").value = arg.endStr.slice(0, 16);
          $("#addAssignmentModal").attr("data-start", arg.start);
          $("#addAssignmentModal").attr("data-end", arg.end);
          $("#addAssignmentModal").attr("data-allDay", arg.allday);
          $("#addAssignmentModal").modal("toggle");
        }
      } else {
        swal({
          title:
            "You need to have a student before you can make an assignment!",
          icon: "warning",
          dangerMode: true,
        });
      }
    },
    async handleDrop(arg) {
      let endDate = new Date(arg.date);
      endDate.setHours(endDate.getHours() + 2);

      let newElements = {
        start: arg.date,
        end: endDate,
        allDay: arg.allDay,
        assignmentId: arg.draggedEl.id,
        fromDashboard: true,
      };

      let event = await this.$refs.Fullcalendar.getApi().getEventById(
        arg.draggedEl.id
      );
      console.log(arg, "this is the drop");

      if (event) {
        event.remove();
      }

      this.$store.dispatch("updateAssignment", newElements);
    },
    handleUpdate(arg) {
      let newElements = {
        start: arg.event.start,
        end: arg.event.end,
        assignmentId: arg.event.id,
      };
      console.log(arg, "this is the update");
      this.$store.dispatch("updateAssignment", newElements);
    },
    async handleEventDragStop(arg) {
      console.log(" event drag stop method");
      console.log(arg);
      let trashEventX = arg.jsEvent.clientX;
      let trashEventY = arg.jsEvent.clientY;
      let trashEl = document.getElementById("draggableContainer");
      let trashElRect = trashEl.getBoundingClientRect();
      let event = this.$refs.Fullcalendar.getApi().getEventById(arg.event.id);
      console.log(trashElRect);
      if (trashEventX > trashElRect.x) {
        if (arg.event.backgroundColor != "") {
          swal({
            title: "Remove Event",
            text:
              "Are you sure you want to remove this event? This will not delete the assignment.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          }).then((willDelete) => {
            if (willDelete) {
              event.remove();
              let newTimes = {
                start: "",
                end: "",
                assignmentId: arg.event.id,
              };
              this.$store.dispatch("updateStudentMock", newTimes);
            }
          });
        } else {
          swal({
            title: "Remove Event",
            text:
              "Are you sure you want to remove this event? This will delete the event from your calendar.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          }).then((willDelete) => {
            if (willDelete) {
              event.remove();
              let newTimes = {
                start: "",
                end: "",
                assignmentId: arg.event.id,
              };
              this.$store.dispatch("deleteEvent", arg.event.id);
            }
          });
        }
      }
    },

    setActiveAssignmentDetails(arg) {
      this.$store.commit("setActiveAssignmentDetails", arg.event.id);

      if (arg.event.backgroundColor != "") {
        $("#assignmentDetailsModal").modal("toggle");
      } else {
        $("#eventDetailsModal").modal("toggle");
      }
    },
    goToDate(arg) {
      this.$refs.Fullcalendar.getApi().changeView("timeGridDay", arg.date);
      console.log("from gotodate");
    },
    fixTimestamp(timestamp) {
      let timestampWithRemovedEnd = timestamp.substring(
        0,
        timestamp.length - 6
      );
      let dateTime = new Date(timestampWithRemovedEnd);
      return dateTime.toLocaleString("en-US");
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

<style>
.max-height {
  height: 87vh;
}
.overflow-y {
  overflow-y: auto;
}
.bg-png {
  background-image: url(../assets/pencil.jpg);
  height: fit-content;
  background-repeat: repeat;
  background-size: cover;
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

.fc {
  background-color: #f4f5f6; /* most backgrounds */
  opacity: 0.9;
}
.fc-unthemed .fc-content,
.fc-unthemed .fc-divider,
.fc-unthemed .fc-list-heading td,
.fc-unthemed .fc-list-view,
.fc-unthemed .fc-popover,
.fc-unthemed .fc-row,
.fc-unthemed tbody,
.fc-unthemed td,
.fc-unthemed th,
.fc-unthemed thead {
  border-color: rgb(173, 173, 173);
}
.fc-today {
  background-color: white !important;
}
.fc-button-primary {
  background-color: #ffce67;
  color: #343a40;
  margin-top: 7px;
  margin-left: 10px;
  margin-right: 7px;
}
.fc-button-primary:not(:disabled).fc-button-active {
  background-color: #888;
  cursor: default;
}
.fc-button-primary:disabled {
  background-color: #888;
}

.fc-scroller::-webkit-scrollbar {
  width: 8px;
}

/* .fc-scroller::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
} */

.fc-scroller::-webkit-scrollbar-thumb {
  background-color: lightgrey;
  width: 6px;
  border-radius: 5px;
}

#draggableContainer::-webkit-scrollbar {
  width: 8px;
}

/* #draggableContainer::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
} */

#draggableContainer::-webkit-scrollbar-thumb {
  background-color: lightgrey;
  width: 6px;
  border-radius: 5px;
}

/* .fc-toolbar h2 {
  color: whitesmoke;
  text-shadow: 0.5px 0.5px black;
} */

/* .fc-event {
  background-color: #f3969a;
  border-color: #f3969a;
} */
</style>
