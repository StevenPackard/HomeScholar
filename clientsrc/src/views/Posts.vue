<template>
  <div class="container-fluid">
    <div class="row push-down-less mb-2">
      <div class="col-12">
        <div class="pt-3 text-center w-100">
          <button
            type="button"
            data-toggle="modal"
            data-target="#addPost"
            class="btn text-dark btn-info"
          >Share an event or get advice</button>
        </div>
      </div>
    </div>
    <div class="row justify-content-center post-box">
      <post v-for="post in posts" :key="post.id" :post="post" />
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
.push-down-less {
  margin-top: 4rem;
}
.post-box {
  height: 82vh;
  overflow-y: auto;
}
</style>