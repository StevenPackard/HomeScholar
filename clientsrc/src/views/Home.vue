<template>
  <div class="home container-fluid">
    <div class="row bg-success pt-4 mt-5">
      <div class="col-12 col-md-8 m-auto py-md-4 pb-4">
        <div class="jumbotron p-4 m-auto shadow my-3">
          <h2 class="display-4 pt-0 mt-0">Welcome to HomeScholar</h2>
          <p class="lead">
            Optimize the education of your children at home. Better planning
            leads to better learning
          </p>
          <hr class="my-3" />
          <p>
            HomeScholar offers a unique experience to optimize your child's
            learning. Take our tour to learn more about how it can change your
            life
          </p>
          <p class="lead">
            <a
              class="btn btn-warning btn-outline-dark btn-lg shadow"
              href="#"
              role="button"
            >Take a tour</a>
            <button @click="login" class="btn-lg btn-warning btn-outline-dark shadow">Sign up</button>
          </p>
        </div>
      </div>
      <div class="col-md-4 col-12 text-center d-flex align-items-center">
        <img class="app-logo" src="@/assets/newLogo.png" alt />
      </div>
    </div>
    <div class="row justify-content-around bg-light m-auto">
      <div class="col-6 p-2 d-flex align-items-center">
        <div class="px-5">
          <h2 class="p-1">
            <b>Make learning fun for everyone!</b>
          </h2>
          <hr class="m-0 m-0 bg-warning" />
          <h3 class="p-1">
            Take your children's learning to the next level from home.
            HomeScholar allows you to to create lesson plans easily and stick
            to a schedule that works for you.
          </h3>
        </div>
      </div>

      <div class="col-4 p-2">
        <img
          src="https://cf.ltkcdn.net/home-school/images/orig/261690-1600x1030-best-free-online-homeschool-programs.jpg"
          class="w-100 p-3 m-2 shadow"
          alt
        />
      </div>
    </div>
    <!-- Reviews Row -->
    <div class="row justify-content-around mt-3 mt-lg-0 bg-light align-items-center">
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
      <div class="col-12 col-md-4 col-lg-3 mt-3 mt-md-0 justify-content-center text-center">
        <div class="card shadow bg-warning">
          <div class="card-body">
            <h5 class="card-title">
              <i class="fa fa-star" aria-hidden="true"></i>
              <i class="fa fa-star" aria-hidden="true"></i>
              <i class="fa fa-star" aria-hidden="true"></i>
              <i class="fa fa-star" aria-hidden="true"></i>
              <i class="fa fa-star" aria-hidden="true"></i>
            </h5>
            <h6 class="card-subtitle mb-2 text-muted">Its the best thing ever!</h6>
            <p class="card-text">
              "HomeScholar really is the best thing for me as a parent. I really
              feel empowered in my children's education now I can spend more
              time focused on actually teaching them instead of worrying about
              my lesson plans. Thank you HomeScholar!"
            </p>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-4 col-lg-3 mt-3 mt-md-3 mb-3 justify-content-center text-center">
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
    <div class="row bg-success justify-content-center pb-2">
      <div class="col-md-6 col-12 text-center mt-2">
        <h3 class="text-dark">Take control of your childrens education.</h3>
        <h3 class="text-dark">Ditch the hassle and start using HomeScholar today!</h3>
      </div>
      <div class="col-md-7 col-12 text-center">
        <router-link :to="{ name: 'tour' }">
          <a
            class="btn btn-warning btn-outline-dark btn-lg shadow"
            href="#"
            role="button"
          >Take a tour</a>
        </router-link>
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
    }
  },
  methods: {
    async login() {
      await this.$auth.loginWithPopup();
      this.$store.dispatch("setBearer", this.$auth.bearer);
      this.$store.dispatch("getProfile");
      this.$router.push({ name: "dashboard" });
      console.log("this.$auth.user: ");
      console.log(this.$auth.user);
    }
  },
  components: {}
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
  opacity: 0.87;
}
.text-box {
  height: 10vh;
}
.app-logo {
  margin: auto;
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
