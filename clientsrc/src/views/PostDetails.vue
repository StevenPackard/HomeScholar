<template>
  <div class="container-fluid grow bg-light">
    <div class="row pt-4">
      <div class="col-12 mt-5">
        <div class="row">
          <post :post="activePost" />
        </div>
        <form class="col-md-10 col-12 offset-md-1" @submit.prevent="addComment">
          <div class="text-center row justify-content-around">
            <input
              class="form-control col-md-8 col-12"
              v-model="commentData.body"
              type="text"
              placeholder="add a comment..."
            />
            <button class="btn btn-success btn-outline-dark mt-md-0 mt-2 col-md-2 col-12">Comment</button>
          </div>
        </form>
      </div>
    </div>
    <div class="row mt-2 comment-box">
      <comment v-for="comment in comments" :key="comment.id" :comment="comment" />
      <div class="col-12 text-center">
        <button
          v-if="comments.length >= commentLength"
          @click="commentLength += 10"
          class="btn btn-success"
        >Show More</button>
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
  height: 43vh;
  overflow-y: auto;
}
</style>
