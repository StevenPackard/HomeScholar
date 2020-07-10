<template>
  <div class="col-12 col-md-7 offset-md-1 comment" :class="{ 'offset-md-4': isCreator }">
    <div class="p-0 my-4 rounded shadow bg-light">
      <div class="p-1">
        <div class="p-relative p-3 rounded bg-secondary">
          <img class="profile-img" :src="comment.creator.picture" alt="img not avalable" />
          <i
            @click="setActiveComment"
            type="button"
            data-toggle="modal"
            data-target="#editComment"
            class="fa fa-pencil top-right"
            v-if="isCreator"
          ></i>
        </div>
        <h5 class="p-2 mt-3">
          {{ comment.creatorEmail }} -
          {{ new Date(comment.createdAt).toLocaleString() }}
        </h5>
        <p class="p-2">{{ comment.body }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["comment"],
  data() {
    return {
      commentData: {}
    };
  },
  methods: {
    setActiveComment() {
      this.$store.dispatch("setActiveComment", this.comment);
    },
    editComment() {
      this.$store.dispatch("editComment", this.commentData);
    }
  },
  computed: {
    isCreator() {
      return this.$store.state.user.email == this.comment.creatorEmail;
    }
  }
};
</script>
<style>
.offset {
  margin-left: 35rem;
}
.comment {
  opacity: 0.9;
}
</style>
