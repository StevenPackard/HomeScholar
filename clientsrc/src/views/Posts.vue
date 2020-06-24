<template>
  <div class="container-fluid">
    <div class="row push-down-less mb-2">
      <div class="col-12 col-md-10 col-lg-8 m-auto text-center">
        <div class="w-100 pt-3">
          <input
            v-model="postQuery"
            class="w-80"
            type="text"
            placeholder="becky@BoiseCodeWorks.com"
          />
          <button
            @click="searchPosts,toggleSearch = !toggleSearch"
            class="btn btn-info"
          >search posts</button>
        </div>
      </div>
      <div class="col-12">
        <div class="pt-3 text-center w-100">
          <button
            type="button"
            data-toggle="modal"
            data-target="#addPost"
            class="btn text-dark btn-info"
          >Share</button>
        </div>
      </div>
    </div>
    <div v-if="!toggleSearch" class="row justify-content-center post-box">
      <post v-for="post in posts" :key="post.id" :post="post" />
    </div>
    <div v-if="toggleSearch" class="row post-box">
      <post v-for="post in searchPosts" :key="post.id" :post="post" />
    </div>
  </div>
</template>
<script>
import Post from "../components/postsComponents/post";
export default {
  data() {
    return { postQuery: "", toggleSearch: false, postsByquery: [] };
  },
  mounted() {
    this.$store.dispatch("getAllPosts");
  },
  computed: {
    posts() {
      return this.$store.state.PostsStore.posts;
    },
    searchPosts() {
      let matches = this.posts.filter(p => p.creator.email == this.postQuery);
      return matches;
    }
  },

  methods: {},
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