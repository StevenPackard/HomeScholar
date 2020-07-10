<template>
  <div class="home container-fluid">
    <div class="row bg-info pt-4 mt-5">
      <div class="col-12 col-md-8">
        <div class="jumbotron shadow">
          <h2 class="display-4">Welcome to HomeScholar</h2>
          <p class="lead">
            Optimize the education of your children at home. Better planning
            leads to better learning
          </p>
          <hr class="my-4" />
          <p>
            HomeScholar offers a unique experience to optimize your childs
            learning. Take our tour to learn more about how it can change your
            life
          </p>
          <p class="lead">
            <button
              @click="login"
              class="btn-lg my-2 btn-warning btn-outline-dark"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
      <div class="col-md-4 col-12 text-center">
        <img class="app-logo" src="@/assets/Logo.png" alt />
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-4 col-12 pt-5">
        <div class="row">
          <div class="col-12">
            <h3>
              <i class="fas fa-school fa-lg"></i>
              Make learning fun for everyone!
            </h3>
          </div>
          <div class="col-12">
            <h3>
              Take your childrens learning to the next level from home.
              HomeScholar allows you to to create lesson plans easily and stick
              to a schedule that works for you.
            </h3>
          </div>
        </div>
      </div>
      <div class="col-md-5 col-12 text-right">
        <img
          src="https://cf.ltkcdn.net/home-school/images/orig/261690-1600x1030-best-free-online-homeschool-programs.jpg"
          class="image-large mt-5 shadow"
          alt
        />
      </div>
    </div>
    <!-- Reviews Row -->
    <div class="row justify-content-around mt-3 mt-lg-0 align-items-center">
      <div class="col-12 col-md-4 col-lg-3 justify-content-center text-center">
        <div class="card shadow bg-warning">
          <div class="card-body">
            <h5 class="card-title">
              <i class="fa fa-star" aria-hidden="true"></i>
              <i class="fa fa-star" aria-hidden="true"></i>
              <i class="fa fa-star" aria-hidden="true"></i>
              <i class="fa fa-star" aria-hidden="true"></i>
            </h5>
            <h6 class="card-subtitle mb-2 text-muted">Amazing product!</h6>
            <p class="card-text">
              "I am beyond impressed with HomeScholar. Even my children noticed
              the improvement in their schedule when I started using it. They
              started asking me why I was so organized and it really is all
              thanks to HomeScholar."
            </p>
          </div>
        </div>
      </div>
      <div
        class="col-12 col-md-4 col-lg-3 mt-3 mt-md-0 justify-content-center text-center"
      >
        <div class="card shadow bg-warning">
          <div class="card-body">
            <h5 class="card-title">
              <i class="fa fa-star" aria-hidden="true"></i>
              <i class="fa fa-star" aria-hidden="true"></i>
              <i class="fa fa-star" aria-hidden="true"></i>
              <i class="fa fa-star" aria-hidden="true"></i>
              <i class="fa fa-star" aria-hidden="true"></i>
            </h5>
            <h6 class="card-subtitle mb-2 text-muted">
              Its the best thing ever!
            </h6>
            <p class="card-text">
              "HomeScholar really is the best thing for me as a parent. I really
              feel empowered in my childrens education now I can spend more time
              focused on actually teaching them instead of worrying about my
              lesson plans. Thank you HomeScholar!"
            </p>
          </div>
        </div>
      </div>
      <div
        class="col-12 col-md-4 col-lg-3 mt-3 mt-md-3 mb-3 justify-content-center text-center"
      >
        <div class="card shadow bg-warning">
          <div class="card-body">
            <h5 class="card-title">
              <i class="fa fa-star" aria-hidden="true"></i>
              <i class="fa fa-star" aria-hidden="true"></i>
              <i class="fa fa-star" aria-hidden="true"></i>
              <i class="fa fa-star" aria-hidden="true"></i>
              <i class="fa fa-star" aria-hidden="true"></i>
            </h5>
            <h6 class="card-subtitle mb-2 text-muted">My kids are smarter!</h6>
            <p class="card-text">
              "Ever since I started using HomeScholar my kids are so much
              smarter. It really is amazing, pretty soon they will be teaching
              me and I bet they will use HomeScholar to make their lesson plans.
              Thank you for creating such a great product!"
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="row bg-info justify-content-center">
      <div class="col-md-6 col-12 text-center mt-3">
        <h3 class="text-dark">Take control of your childrens education.</h3>
        <h3 class="text-dark">
          Ditch the hassle and start using HomeScholar today!
        </h3>
      </div>
      <div class="col-md-7 col-12 text-center">
        <a
          class="btn btn-warning btn-outline-dark btn-lg shadow"
          href="#"
          role="button"
          @click="showTourAlert"
          >Take a tour</a
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {};
  },
  computed: {
    profile() {
      return this.$store.state.user;
    },
  },

  methods: {
    async login() {
      await this.$auth.loginWithPopup();
      this.$store.dispatch("setBearer", this.$auth.bearer);
      this.$store.dispatch("getProfile");
      this.$router.push({ name: "dashboard" });
      console.log("this.$auth.user: ");
      console.log(this.$auth.user);
    },
    async tourLogout() {
      debugger;
      await this.$auth.logout({
        returnTo: window.location.origin + "/#/tour",
      });
    },
    showTourAlert() {
      if (!this.$auth.isAuthenticated) {
        this.$router.push({ name: "tour" });
      } else {
        swal({
          title: "Are you sure?",
          text: "You will be logged out if you want to take the tour",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            this.tourLogout();
          }
        });
      }
    },
  },
  components: {},
};
</script>

<style lang="scss" scoped>
@import "@/assets/minty.scss";
.home-row {
  height: 30vh;
}
.home-row-large {
  height: 40vh;
}
.home-row-small {
  height: 20vh;
}
.image-large {
  width: 100%;
}
.jumbotron {
  opacity: 0.85;
  background-color: #f4f5f6;
}
.text-box {
  height: 10vh;
}
.app-logo {
  width: 100%;
}
@media screen and (min-width: 600px) {
  .push-down-less {
    margin-top: 4rem;
  }
}
.card {
  opacity: 0.85;
  min-height: 15em;
}
</style>
