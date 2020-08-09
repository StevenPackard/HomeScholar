<template>
  <div
    class="modal fade"
    id="filterPosts"
    tabindex="-1"
    role="dialog"
    aria-labelledby="searchpost"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg modal-dialog-center" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="filterOptions">Filter Options</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form id="filterPostsForm">
            <div class="form-group">
              <input
                type="text"
                placeholder="Search..."
                class="form-control"
                id="query-input"
                v-model="query.body"
              />
            </div>
            <div class="form-group d-flex justify-content center">
              <div class="p-2 px-4">
                <label for="subject" class="col-form-label">Search title</label>
                <input type="checkbox" v-model="query.searchTitle" />
              </div>

              <div class="p-2 px-4">
                <label for="subject" class="col-form-label">Search body</label>
                <input type="checkbox" v-model="query.searchBody" />
              </div>
            </div>
            <div class="form-group d-flex justify-content center">
              <div class="p-2 px-4">
                <label for="subject" class="col-form-label">Virtual</label>
                <input type="checkbox" v-model="query.virtual" />
              </div>
              <div class="p-2 px-4">
                <label for="subject" class="col-form-label">In person</label>
                <input type="checkbox" v-model="query.inPerson" />
              </div>
            </div>
            <div>
              <button
                data-dismiss="modal"
                class=" btn btn-success"
                @click="querySearch"
              >
                Apply
              </button>
            </div>
          </form>
        </div>
        <div class="modal-footer"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: {
        body: "",
        searchTitle: true,
        searchBody: true,
        virtual: true,
        inPerson: true,
      },
    };
  },
  methods: {
    querySearch() {
      this.$store.dispatch("getFilteredPosts", { ...this.query });
    },
  },
};
</script>

<style></style>
