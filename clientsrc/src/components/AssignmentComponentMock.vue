<template>
  <div class="assignment-component-mock col-11 text-center bg-light mt-3">
    <div class="row">
      <div class="col-4">
        <h3>{{assignment.subject}}</h3>
      </div>
      <div class="col-4">
        <h3>{{assignment.title}}</h3>
      </div>
      <div class="col-4">
        <h3>{{assignment.grade}}</h3>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "assignment-component-mock",
  data() {
    return {};
  },
  computed: {},
  methods: {},
  components: {},
  props: ["assignment"]
};
</script>


<style scoped>
</style>