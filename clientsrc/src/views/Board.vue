<template>
  <div class="board">
    <h1 v-if="board.title"></h1>
    <h1 v-else>Loading...</h1>
  </div>
</template>

<script>
export default {
  name: "board",
  computed: {},
  props: ["boardId"]
};
</script>
