<template>
  <div class="post col-12 col-md-9 pb-3 pt-4">
    <div class="shadow text-dark bg-light rounded p-1">
      <div class="p-2 p-relative bg-success p-4 rounded">
        <img class="profile-img" :src="post.creator.picture" alt="img not avalable" />
        <i
          @click="setActivePost"
          data-toggle="modal"
          data-target="#editPost"
          v-if="this.$auth.user.email == post.creatorEmail"
          class="fa fa-pencil top-right action"
        ></i>
      </div>
      <p class="p-3">{{ post.creatorEmail }}</p>
      <h2 @click="routeToDetails" class="text-center p-2 action">{{ post.title }}</h2>
      <p class="text-center">{{ new Date(post.createdAt).toLocaleString() }}</p>
      <p class="p-2 text-center">{{ post.body }}</p>
      <div v-if="!this.$route.params.id" class="text-center">
        <p @click="routeToDetails" class="btn btn-outline-dark btn-warning">
          view comments
          <i class="fa fa-comment"></i>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["post"],
  methods: {
    routeToDetails() {
      if (this.$route.params.id != this.post._id) {
        this.$router.push("postDetails/" + this.post._id);
      }
    },
    setActivePost() {
      console.log("setActivePosts");
      this.$store.dispatch("setActivePost", this.post.id);
    }
  }
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
