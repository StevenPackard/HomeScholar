<template>
  <div class="col-7" :class="{ offset: isCreator }">
    <div class="bg-warning p-0 my-3 rounded shadow">
      <div class="p-1">
        <div class="p-relative p-2">
          <i
            @click="setActiveComment"
            type="button"
            data-toggle="modal"
            data-target="#editComment"
            class="fa fa-pencil top-right action"
            v-if="isCreator"
          ></i>
        </div>
        <h5 class="p-2 mt-3">
          {{ comment.creatorEmail }} - {{ comment.createdAt }}
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
      commentData: {},
    };
  },
  methods: {
    setActiveComment() {
      this.$store.dispatch("setActiveComment", this.comment);
    },
    editComment() {
      this.$store.dispatch("editComment", this.commentData);
    },
  },
  computed: {
    isCreator() {
      return this.$store.state.user.email == this.comment.creatorEmail;
    },
  },
};
</script>
<style>
.offset {
  margin-left: 30rem;
}
</style>
