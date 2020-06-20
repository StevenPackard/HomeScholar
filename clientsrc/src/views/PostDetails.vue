<template>
  <div class="p-5 m-5">
    <post :post="activePost" />
    <form @submit.prevent="addComment">
      <input v-model="commentData.body" type="text" placeholder="add a comment" />
      <button class="btn btn-success">+</button>
    </form>
    <comment v-for="comment in comments" :key="comment.id" :comment="comment" />
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

<style>
</style>