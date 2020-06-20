<template>
  <div class="container-fluid">
    <div class="row p-5 m-5">
      <div class="col-12 p-0 text-center">
        <h2>Share ideas for projects</h2>
        <post v-for="post in posts" :key="post.id" :post="post" />
      </div>
    </div>
  </div>
</template>

<script>
import Post from "../components/postsComponents/post";
export default {
  mounted() {
    this.$store.dispatch("getAllPosts");
  },
  computed: {
    posts() {
      return this.$store.state.PostsStore.posts;
    }
  },
  components: {
    Post
  }
};
</script>

<style>
</style>