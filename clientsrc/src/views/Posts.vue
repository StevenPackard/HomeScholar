<template>
  <div class="container-fluid bg-image">
    <div class="row push-down mb-2">
      <div class="push-down-less">
        <div
          class="col-12 col-sm-10 col-md-8 col-lg-6 fixed-top mt-5 mx-auto bg-light rounded shadow p-2  "
        >
          <div class="d-flex justify-content-center   ">
            <button
              data-toggle="modal"
              data-target="#filterPosts"
              class="btn btn-info btn-outline-dark mt-2 mx-2"
            >
              Filter posts
            </button>
          </div>
          <div class="pt-2 text-center w-100">
            <button
              type="button"
              data-toggle="modal"
              data-target="#addPost"
              class="btn btn-outline-dark btn-warning"
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
    </div>
    <div v-if="toggleSearch" class="row justify-content-center ">
      <span></span>
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
  top: 1px;
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
