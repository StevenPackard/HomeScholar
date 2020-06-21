<template>
  <div class="bg-warning p-0 my-5 rounded shadow">
    <div class="p-1">
      <div class="p-relative p-2">
        <img class="profile-img" src="https://placehold.it/60" alt />
        <i
          @click="setActiveComment"
          type="button"
          data-toggle="modal"
          data-target="#editComment"
          class="fa fa-pencil top-right action"
        ></i>
      </div>
      <h5 class="p-2 mt-3">{{comment.creatorEmail}}</h5>
      <p class="p-2">{{comment.body}}</p>
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
  }
};
</script>

