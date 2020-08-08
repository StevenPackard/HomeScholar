<template>
  <div class="container-fluid bg-image">
    <div class="row push-down-less mb-2">
      <div class="col-12 col-md-10 col-lg-8 m-auto text-center">
        <div class="row pt-3 justify-content-around sticky"></div>
      </div>
      <div class="col-12">
        <div class="d-flex justify-content-center ">
          <span class="filterdiv">
            <button
              data-toggle="modal"
              data-target="#filterPosts"
              class="btn btn-warning btn-outline-dark mt-2 sticky-top mx-2"
            >
              Filter posts
            </button>
          </span>
        </div>
        <div class="pt-5 text-center w-100">
          <button
            type="button"
            data-toggle="modal"
            data-target="#addPost"
            class="btn btn-outline-dark btn-info"
          >
            New Post
          </button>
        </div>
      </div>
    </div>
    <div v-if="!toggleSearch" class="row justify-content-center">
      <post v-for="post in posts" :key="post.id" :post="post" />
      <div class="col-12 text-center mb-3">
        <button
          v-if="posts.length >= postLength"
          @click="postLength += 10"
          class="btn btn-success"
        >
          Show More
        </button>
      </div>
    </div>
    <div v-if="toggleSearch" class="row justify-content-center">
      <post v-for="post in searchPosts" :key="post.id" :post="post" />
    </div>
  </div>
</template>
<script>
import Post from "../components/postsComponents/post";
export default {
  data() {
    return {
      postQuery: "",
      toggleSearch: false,
      postsByquery: [],
      postLength: 10,
    };
  },
  mounted() {
    this.$store.dispatch("getAllPosts");
  },
  computed: {
    posts() {
      return this.$store.state.PostsStore.posts
        .sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return -1;
          } else if (a.createdAt < b.createdAt) {
            return 1;
          }
        })
        .slice(0, this.postLength);
    },
    searchPosts() {
      this.$store.dispatch("getAllPosts");
      return matches;
    },
  },

  methods: {},
  components: {
    Post,
  },
};
</script>
<style>
.filterdiv {
  position: absolute;
  top: -15px;
}
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
.sticky {
  position: sticky;
}
.bg-image {
  background: url(../assets/crayon.jpg);
  height: fit-content;
  background-repeat: repeat;
}
</style>
