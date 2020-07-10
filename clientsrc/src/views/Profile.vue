<template>
  <div class="container-fluid">
    <div class="row pt-5">
      <div class="col-12 p-3 pt-5 d-flex align-items-center">
        <img class="profileImg d-inline" :src="user.picture" alt />
        <h2 class="d-inline m-0 pl-2">{{ user.name }}</h2>
      </div>
      <div class="col-12 p-1 m-0">
        <div class="row text-center">
          <div class="col-3">
            <h4>Active students</h4>
          </div>
          <div class="col-3">
            <h4>Grade</h4>
          </div>
          <div class="col-3">
            <h4>Edit</h4>
          </div>
          <div class="col-3">
            <h4>View transctipt</h4>
          </div>
        </div>
      </div>
      <div class="col-12 p-1" v-for="(student, index) in students" :key="index">
        <div class="row text-center" v-if="!student.archived">
          <div class="col-3">{{student.name.toUpperCase()}}</div>
          <div class="col-3">
            <span v-if="true" class>{{ student.gradeLevel }}</span>
          </div>
          <div class="col-3">
            <span
              @click="setActiveStudent(student.id)"
              v-if="true"
              class="action"
              data-toggle="modal"
              data-target="#editStudentModal"
            >Edit</span>
          </div>
          <div class="col-3">
            <span
              @click="routeToTranscript(student.id)"
              v-if="true"
              title="view transctipt"
              class="action"
            >View transcript</span>
          </div>
        </div>
      </div>
      <div class="col-12 p-0 pt-3 m-0">
        <hr class="p-0 bg-dark m-0" />
      </div>
      <div class="col-12 p-1 pt-3">
        <div class="row text-center">
          <div class="col-3">
            <h4>Archived students</h4>
          </div>
          <div class="col-3">
            <h4>Grade</h4>
          </div>
          <div class="col-3">
            <h4>Edit</h4>
          </div>
          <div class="col-3">
            <h4>View transcript</h4>
          </div>
        </div>
      </div>
      <div class="col-12 pt-1" v-for="student in students" :key="student.id">
        <div class="row text-center" v-if="student.archived">
          <div class="col-3">{{student.name}}</div>
          <div class="col-3">
            <span v-if="true" class>{{ student.gradeLevel }}</span>
          </div>
          <div class="col-3">
            <span
              @click="setActiveStudent(student.id)"
              v-if="true"
              class="action"
              data-toggle="modal"
              data-target="#editStudentModal"
            >Edit</span>
          </div>
          <div class="col-3">
            <span
              @click="routeToTranscript(student.id)"
              v-if="true"
              title="view transctipt"
              class="action"
            >View transcript</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.user;
    },
    students() {
      return this.$store.state.StudentStore.students;
    }
  },
  methods: {
    setActiveStudent(id) {
      this.$store.dispatch("getStudentById", id);
    },
    routeToTranscript(id) {
      this.$router.push("/transcript/" + id);
    }
  }
};
</script>

<style>
.profileImg {
  border-radius: 50%;
  width: 5rem;
  height: 5rem;
}
.action {
  cursor: pointer;
}
</style>
