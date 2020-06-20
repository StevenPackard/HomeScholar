<template>
  <div class="container-fluid">
    <div class="row pt-4 bg-light">
      <div class="col-12 pt-5">
        <post :post="activePost" />
        <form @submit.prevent="addComment">
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
      <div class="col-12">
        <comment v-for="comment in comments" :key="comment.id" :comment="comment" />
      </div>
    </div>
  </div>
</template>

<script>
import comment from "../components/postsComponents/comment";
import post from "../components/postsComponents/post";
export default {
  mounted() {
    this.$store.dispatch("setActivePost", this.$route.params.id);
    this.$store.dispatch("getCommentsByPostId", this.$route.params.id);
  },
  data() {
    return { commentData: {} };
  },

  computed: {
    activePost() {
      return this.$store.state.PostsStore.activePost;
    },
    comments() {
      return this.$store.state.CommentsStore.comments;
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

