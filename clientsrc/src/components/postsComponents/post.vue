<template>
  <div class="post col-12 col-md-9 pb-3 pt-4">
    <div class="shadow text-dark bg-light rounded p-1">
      <div class="p-2 p-relative bg-success p-4 rounded">
        <img
          class="profile-img"
          :src="post.creator.picture"
          alt="img not avalable"
        />
        <i
          @click="setActivePost"
          data-toggle="modal"
          data-target="#editPost"
          v-if="this.$auth.user.email == post.creatorEmail"
          class="fa fa-pencil top-right action"
        ></i>
      </div>
      <p class="p-3">{{ post.creatorEmail }}</p>
      <h2 @click="routeToDetails" class="text-center p-2 action">
        {{ post.title }}
      </h2>
      <p class="text-center">{{ new Date(post.createdAt).toLocaleString() }}</p>
      <p class="p-2 text-center">{{ post.body }}</p>
      <div v-if="!this.$route.params.id" class="text-center">
        <p @click="routeToDetails" class="btn btn-outline-dark btn-warning m-0">
          view comments
          <i class="fa fa-comment"></i>
        </p>
        <button
          v-if="!checkUserEvents && this.$auth.user.email != post.creatorEmail"
          type="button"
          @click="addEvent"
          class="btn btn-warning btn-outline-dark"
          title="Add this event to your calander"
        >
          Add to calendar
        </button>
        <div v-if="true">
          <p class="p-1 mt-2">
            <span>{{ "Start: " + this.convertToLocalTime(post.start) }}</span>
            <br />
            <span>{{ "End: " + this.convertToLocalTime(post.end) }}</span>
            <br />
          </p>
          <div v-if="post.type == 'inPerson'">
            <i class="fas fa-head-side-mask"></i>
          </div>
          <div v-if="post.type == 'remote'">
            <i class="fas fa-laptop"></i>
          </div>
          <!-- <p
            class="p-1 mt-1 m-0"
          >{{"Start: "+ post.start.slice(5,7)+"/" + post.start.slice(8,10) +" @ " +post.start.slice(11,13) +":"+ post.start.slice(14,16)}}</p>
          <p
            class="p-1 m-0"
          >{{"End: "+post.end.slice(5,7)+"/" + post.end.slice(8,10) +" @ " +post.end.slice(11,13) +":"+ post.end.slice(14,16)}}</p>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("getAllEvents");
  },
  props: ["post"],
  computed: {
    userEvents() {
      return this.$store.state.PostsStore.events;
    },
    checkUserEvents() {
      let userEvents = this.userEvents;
      for (let i = 0; i < this.userEvents.length; i++) {
        if ("postId" in userEvents[i]) {
          if (this.userEvents[i].postId == this.post.id) {
            return true;
            break;
          }
        }
      }
      return false;
    },
  },
  methods: {
    addEvent() {
      this.$store.dispatch("addEvent", this.post);
      // console.log("add event thing");
      this.$store.dispatch("getAllEvents");
    },
    convertToLocalTime(time) {
      let m = moment(time);
      return m.format("dddd, MMMM Do , h:mm a");
    },
    routeToDetails() {
      if (this.$route.params.id != this.post._id) {
        this.$router.push("postDetails/" + this.post._id);
      }
    },
    setActivePost() {
      console.log("setActivePosts");
      this.$store.dispatch("setActivePost", this.post.id);
    },
  },
};
</script>

<style>
.top-right {
  position: absolute;
  right: 0.5rem;
  top: 0.6rem;
}
.p-relative {
  position: relative;
}
.profile-img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  position: absolute;
  top: -1.6rem;
  left: 1.5rem;
}
.action {
  cursor: default;
}
</style>
