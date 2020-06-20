<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 p-0 pt-5 text-center"></div>
      <div class="col-12 py-5">
        <div class="mt-5 pt-3 text-center w-100 fixed-top">
          <button
            type="button"
            data-toggle="modal"
            data-target="#editPost"
            class="btn text-dark btn-info"
          >Share an event or get advice</button>
        </div>
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
<style >
.post-form {
  border-radius: 6px;
}
.w-80 {
  min-width: 80%;
}
</style>