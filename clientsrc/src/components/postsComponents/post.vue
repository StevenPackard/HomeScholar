<template>
  <div class="col-12">
    <div @click="routeToDetails" class="bg-warning shadow text-dark rounded action">
      <img class="profile-img" src="https://placehold.it/60" alt="img not avalable" />
      <h3>{{post.title}}</h3>
      <p>{{post.id}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["post"],
  methods: {
    routeToDetails() {
      this.$router.push("postDetails/" + this.post._id);
    }
  }
};
</script>

<style>
.profile-img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
</style>