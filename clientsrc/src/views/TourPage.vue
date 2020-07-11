<template>
  <div class="dashboard container-fluid bg-png bg-light">
    <div class="row push-down">
      <!-- <timeline /> -->
      <div class="col-md-8 order-md-1 order-2 col-12 max-height">
        <Fullcalendar
          class="rounded shadow"
          id="myFakeCal"
          ref="Fullcalendar"
          height="parent"
          defaultView="timeGridDay"
          :plugins="calendarPlugins"
          :selectable="true"
          :dragRevertDuration="0"
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
        />
      </div>
      <div
        id="draggableFakeContainer"
        class="col-md-4 col-12 order-md-2 order-1 max-height overflow-y"
        data-v-step="8"
      >
        <!-- NOTE Below is the trash icon.  This is an alternative to dragging to side to remove event -->
        <!-- <i id="event-trash" class="fas fa-trash-alt fa-3x float-left"></i> -->
        <div class="row mr-1 justify-content-center">
          <button
            data-toggle="modal"
            data-target="#addAssignmentModal"
            class="btn btn-warning btn-outline-dark mt-2 sticky-top mx-2"
            data-v-step="2"
          >
            Add Assignment
          </button>
          <!-- view events button -->
          <button
            class="btn btn-warning btn-outline-dark mt-2 mx-2"
            data-v-step="3"
          >
            View Events
          </button>
          <!-- student dropdown -->
          <button
            class="dropdown-toggle btn btn-warning btn-outline-dark mt-2 mx-2"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            data-v-step="4"
          >
            Students
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <p class="p-0 m-0"></p>
            <span>
              <a
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
                @click="showOne = true"
                type="button"
                class="nav-link"
                >Fake Name 1</a
              >
            </span>
            <span>
              <a
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
                @click="showOne = true"
                type="button"
                class="nav-link"
                >Fake Name 2</a
              >
            </span>
            <a
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
              @click="showOne = false"
              type="button"
              class="nav-link"
            >
              <b>Show All</b>
            </a>
          </div>
          <!-- <assignment /> -->
          <!-- Fake Student Component 1 -->
          <div
            class="student-mock-component col-12 my-3 shadow rounded color bg-warning"
            :class="{ showAllSize: showOne == false, solo: showOne }"
          >
            <div class="row text-center justify-content-center">
              <div class="col-12">
                <h4 data-v-step="6">
                  Fake Name
                  <i class="fas fa-school mx-4"></i>
                  Grade Level - 1
                </h4>

                <span>Hide Graded</span>
                <input class="btn btn-warning" type="checkbox" checked />
              </div>
              <div class="col-7 border-bottom border-dark">
                <h5>All Assignments</h5>
              </div>
            </div>
            <div
              class="row assignment-box justify-content-center mt-2 solo-assigns"
            >
              <ol class="col-11">
                <li
                  draggable="true"
                  class="assignment-component-mock p-0 col-12 text-center rounded border border-dark my-1 action p-2 drag-item"
                  :data-event="assignmentString"
                  id="fakeAssign1"
                  data-v-step="5"
                >
                  <div
                    data-toggle="modal"
                    data-target="#assignmentDetailsModal"
                    class
                  >
                    <div class="row">
                      <div class="col-4">
                        <h5 class>Math</h5>
                      </div>
                      <div class="col-4">
                        <h5 class>Division</h5>
                      </div>
                      <div class="col-4">
                        <h5 class>Ungraded</h5>
                      </div>
                    </div>
                  </div>
                </li>
              </ol>
            </div>
          </div>
          <!-- Fake Student component 2 -->
          <div
            class="student-mock-component col-12 my-3 shadow rounded color bg-secondary"
            :class="{ showAllSize: showOne == false, hide: showOne == true }"
          >
            <div class="row text-center justify-content-center">
              <div class="col-12">
                <h4>
                  Fake Name 2
                  <i class="fas fa-school mx-4"></i>
                  Grade Level - 1
                </h4>

                <span>Hide Graded</span>
                <input class="btn btn-warning" type="checkbox" checked />
              </div>
              <div class="col-7 border-bottom border-dark">
                <h5>All Assignments</h5>
              </div>
            </div>
            <div
              class="row assignment-box justify-content-center mt-2 solo-assigns"
            >
              <ol class="col-11">
                <li
                  draggable="true"
                  class="assignment-component-mock p-0 col-12 text-center rounded border border-dark my-1 action p-2 drag-item"
                  :data-event="assignmentString"
                  id="fakeAssign2"
                >
                  <div
                    data-toggle="modal"
                    data-target="#assignmentDetailsModal"
                    class
                  >
                    <div class="row">
                      <div class="col-4">
                        <h5 class>Math</h5>
                      </div>
                      <div class="col-4">
                        <h5 class>Division</h5>
                      </div>
                      <div class="col-4">
                        <h5 class>Ungraded</h5>
                      </div>
                    </div>
                  </div>
                </li>
              </ol>
            </div>
          </div>
          <!-- <student v-show="activeStudent" :student="a" /> -->
        </div>
      </div>
    </div>
    <v-tour name="myTour" :steps="steps"></v-tour>
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
  name: "tourpage",
  mounted() {
    let draggableElement1 = document.getElementById("fakeAssign1");
    new Draggable(draggableElement1);
    let draggableElement2 = document.getElementById("fakeAssign2");
    new Draggable(draggableElement2);
    this.$tours["myTour"].start();
  },

  data() {
    return {
      calendarPlugins: [
        DayGridPlugin,
        TimeGridPlugin,
        InteractionPlugin,
        ListPlugin,
      ],
      assignmentString: JSON.stringify({
        title: "Division",
        duration: "02:00",
        id: "fakeAssign1",
      }),
      showOne: false,
      steps: [
        {
          target: '[data-v-step="0"]', // We're using document.querySelector() under the hood
          header: {
            title: "Welcome to HomeScholar!",
          },
          content: `Take the tour to see what you can do! `,
          params: {},
        },
        {
          target: '[data-v-step="1"]',
          content: "Click on students to add a student that you can manage!",
          params: {
            placement: "top",
          },
        },
        {
          target: '[data-v-step="2"]',
          content: "Add an assignment for your student to complete",
          params: {
            placement: "bottom", // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
          },
        },
        {
          target: '[data-v-step="3"]',
          content:
            "View Events other parents have shared. Field trips are fun!",
          params: {
            placement: "top", // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
          },
        },
        {
          target: '[data-v-step="4"]',
          content: "Use this dropdown to choose a single student to show.",
          params: {
            placement: "top", // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
          },
        },
        {
          target: '[data-v-step="5"]',
          content:
            "Drag and drop assignments onto the calendar to create a lesson plan!",
          params: {
            placement: "bottom", // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
          },
        },
        {
          target: '[data-v-step="6"]',
          content:
            "Click on your students name to navigate to the details page.",
          params: {
            placement: "left", // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
          },
        },
        {
          target: '[data-v-step="7"]',
          content:
            "Click your picture to navigate to your profile. You can view your active and archived students there.",
          params: {
            placement: "bottom", // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
          },
        },
        {
          target: '[data-v-step="8"]',
          content: "Enjoy your time with our site. Please dont break it!",
          params: {
            placement: "bottom", // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
          },
        },
      ],
    };
  },
  computed: {},
  methods: {
    handleReceived(arg) {
      let event = this.$refs.Fullcalendar.getApi().getEventById(arg.event.id);
      // console.log("recieved", arg);
      // event.remove();
      // NOTE We may need to revert this because we still get duplicates
      let events = this.$refs.Fullcalendar.getApi().getEvents();
      console.log(event.id);
      console.log(events);
      // for (let i = 0; i < events.length; i++) {
      //   if (event.id == events[i].id) {
      //     events[i].remove();
      //   }
      //   // console.log(events[i].id);
      //   // events[i].remove();
      // }
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
        $("#addAssignmentModal").attr("data-start", arg.start);
        $("#addAssignmentModal").attr("data-end", arg.end);
        $("#addAssignmentModal").attr("data-allDay", arg.allday);
        $("#addAssignmentModal").modal("toggle");
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
    },
    handleUpdate(arg) {
      let newElements = {
        start: arg.event.start,
        end: arg.event.end,
        assignmentId: arg.event.id,
      };
      console.log(arg);
    },
    async handleEventDragStop(arg) {
      console.log(" event drag stop method");
      console.log(arg);
      let trashEventX = arg.jsEvent.clientX;
      let trashEventY = arg.jsEvent.clientY;
      let trashEl = document.getElementById("draggableFakeContainer");
      let trashElRect = trashEl.getBoundingClientRect();
      console.log(trashElRect);
      console.log(trashEventX);

      let events = this.$refs.Fullcalendar.getApi().getEvents();
      console.log(events);

      if (trashEventX > trashElRect.x) {
        swal({
          title: "Remove Event",
          text:
            "Are you sure you want to remove this event? This will not delete the assignment.",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            for (let i = 0; i < events.length; i++) {
              events[i].remove();

              // console.log(events[i].id);
              // events[i].remove();
            }
            let newTimes = {
              start: "",
              end: "",
              assignmentId: arg.event.id,
            };
          }
        });
      }
      // NOTE This goes with the trash icon for event removal
      // let trashEl = document.getElementById("event-trash");
      // let trashElRect = trashEl.getBoundingClientRect();
      // console.log("trashEvent coors", trashEventX, trashEventY);
      // console.log("trash coors", trashElRect.x, trashElRect.y);

      // let diffX = Math.abs(trashEventX - trashElRect.x);
      // let diffY = Math.abs(trashEventY - trashElRect.y);
      // console.log("diffx: ", diffX);
      // console.log("diffY: ", diffY);
      // if (diffX < 50 && diffY < 40) {
      //   console.log("good to delete");
      // }
    },

    setActiveAssignmentDetails(arg) {
      this.$store.commit("setActiveAssignmentDetails", arg.event.id);
      $("#assignmentDetailsModal").modal("toggle");
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

<style scoped>
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
/* .fc-toolbar h2 {
  color: whitesmoke;
  text-shadow: 0.5px 0.5px black;
} */

/* .fc-event {
  background-color: #f3969a;
  border-color: #f3969a;
} */
.solo {
  height: 75vh;
}
.opaque {
  opacity: 0.9;
}
.soloAssigns {
  height: 60vh;
  overflow-y: auto;
  overflow-x: hidden;
}
.hide {
  display: none;
}
.showAllSize {
  height: 35vh;
}
</style>
