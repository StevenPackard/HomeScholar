<template>
  <div class="post my-2 py-4">
    <div class="bg-warning shadow text-dark rounded p-1">
      <div class="p-2 p-relative">
        <img
          class="profile-img"
          src="https://placehold.it/60"
          alt="img not avalable"
        />
        <i
          @click="setActivePost"
          type="button"
          data-toggle="modal"
          data-target="#editPost"
          v-if="true"
          class="fa fa-pencil top-right action"
        ></i>
      </div>
      <h4 class="p-3">{{ post.creatorEmail }}</h4>
      <h5 class="text-center p-2">{{ post.title }}</h5>
      <p class="p-2">{{ post.body }}</p>
      <div v-if="!this.$route.params.id" class="text-center">
        <p @click="routeToDetails" class="btn btn-outline-dark">
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
  top: -2rem;
  left: 1.5rem;
}
</style>
