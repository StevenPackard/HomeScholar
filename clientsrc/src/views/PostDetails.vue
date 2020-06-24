<template>
  <div class="container-fluid bg-light">
    <div class="row pt-4">
      <div class="col-12 pt-5">
        <div class="row">
          <post :post="activePost" />
        </div>
        <form class="col-10 offset-1" @submit.prevent="addComment">
          <div class="text-center">
            <input
              class="w-80 p-2 my-2 rounded"
              v-model="commentData.body"
              type="text"
              placeholder="add a comment"
            />
            <button class="btn btn-success my-2 m-1">
              <small>Comment</small>
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="row comment-box mt-2">
      <comment v-for="comment in comments" :key="comment.id" :comment="comment" />
      <div class="col-12 text-center">
        <button @click="commentLength += 10" class="btn btn-success">Show More</button>
      </div>
    </div>
  </div>
</template>

<script>
import comment from "../components/postsComponents/comment";
import post from "../components/postsComponents/post";
export default {
  mounted() {
    // this.$store.dispatch("initializeSocket", this.$route.params.id);
    this.$store.dispatch("setActivePost", this.$route.params.id);
    this.$store.dispatch("getCommentsByPostId", this.$route.params.id);
    this.$store.dispatch("joinPostRoom", this.$route.params.id);
  },
  data() {
    return { commentData: {}, commentLength: 10 };
  },

  computed: {
    activePost() {
      return this.$store.state.PostsStore.activePost;
    },
    comments() {
      return this.$store.state.CommentsStore.comments
        .sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return -1;
          } else if (a.createdAt < b.createdAt) {
            return 1;
          }
        })
        .slice(0, this.commentLength);
    }
  },
  methods: {
    async addComment() {
      let data = {
        body: this.commentData.body,
        postId: this.$route.params.id
      };
      await this.$store.dispatch("addComment", data);
      this.$store.dispatch("getCommentsByPostId", this.$route.params.id);
      this.commentData.body = "";
    }
  },
  components: {
    comment,
    post
  }
};
</script>
<style>
.comment-box {
  height: 52vh;
  overflow-y: auto;
}
</style>
