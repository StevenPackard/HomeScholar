<template>
  <div class="home container-fluid">
    <div class="row bg-info pt-4">
      <div class="col-8">
        <div class="jumbotron shadow">
          <h1 class="display-4">Welcome to HomeScholar</h1>
          <p
            class="lead"
          >Optimize the education of your children at home. Better planning leads to better learning</p>
          <hr class="my-4" />
          <p>HomeScholar offers a unique experience to optimize your childs learning. Take our tour to learn more about how it can change your life</p>
          <p class="lead">
            <a class="btn btn-info btn-lg shadow" href="#" role="button">Take a tour</a>
          </p>
        </div>
      </div>
    </div>
    <div class="row home-row-large bg-light justify-content-center">
      <div class="col-4 pt-5">
        <div class="row">
          <div class="col-12">
            <h3>
              <i class="fas fa-book fa-lg"></i>
              Make learning fun for everyone!
            </h3>
          </div>
          <div class="col">
            <h3>Take your childrens learning to the next level from home. HomeScholar allows you to to create lesson plans easily and stick to a schedule that works for you.</h3>
          </div>
        </div>
      </div>
      <div class="col-5 text-right">
        <img
          src="https://cf.ltkcdn.net/home-school/images/orig/261690-1600x1030-best-free-online-homeschool-programs.jpg"
          class="image-large mt-5 shadow"
          alt
        />
      </div>
    </div>
    <!-- Reviews Row -->
    <div class="row home-row-large bg-primary justify-content-center align-items-center">
      <div class="col-4 justify-content-center d-flex text-center">
        <div class="card shadow" style="width: 20rem;">
          <div class="card-body">
            <h5 class="card-title">
              <i class="fa fa-star" aria-hidden="true"></i>
              <i class="fa fa-star" aria-hidden="true"></i>
              <i class="fa fa-star" aria-hidden="true"></i>
              <i class="fa fa-star" aria-hidden="true"></i>
            </h5>
            <h6 class="card-subtitle mb-2 text-muted">Amazing product!</h6>
            <p
              class="card-text"
            >"I am beyond impressed with HomeScholar. Even my children noticed the improvement in their schedule when I started using it. They started asking me why I was so organized and it really is all thanks to HomeScholar."</p>
          </div>
        </div>
      </div>
      <div class="col-4 justify-content-center d-flex text-center">
        <div class="card shadow" style="width: 20rem;">
          <div class="card-body">
            <h5 class="card-title">
              <i class="fa fa-star" aria-hidden="true"></i>
              <i class="fa fa-star" aria-hidden="true"></i>
              <i class="fa fa-star" aria-hidden="true"></i>
              <i class="fa fa-star" aria-hidden="true"></i>
              <i class="fa fa-star" aria-hidden="true"></i>
            </h5>
            <h6 class="card-subtitle mb-2 text-muted">Its the best thing ever!</h6>
            <p
              class="card-text"
            >"HomeScholar really is the best thing for me as a parent. I really feel empowered in my childrens education now I can spend more time focused on actually teaching them instead of worrying about my lesson plans. Thank you HomeScholar!"</p>
          </div>
        </div>
      </div>
      <div class="col-4 justify-content-center d-flex text-center">
        <div class="card shadow" style="width: 20rem;">
          <div class="card-body">
            <h5 class="card-title">
              <i class="fa fa-star" aria-hidden="true"></i>
              <i class="fa fa-star" aria-hidden="true"></i>
              <i class="fa fa-star" aria-hidden="true"></i>
              <i class="fa fa-star" aria-hidden="true"></i>
              <i class="fa fa-star" aria-hidden="true"></i>
            </h5>
            <h6 class="card-subtitle mb-2 text-muted">My kids are smarter!</h6>
            <p
              class="card-text"
            >"Ever since I started using HomeScholar my kids are so much smarter. It really is amazing, pretty soon they will be teaching me and I bet they will use HomeScholar to make their lesson plans. Thank you for creating such a great product!"</p>
          </div>
        </div>
      </div>
    </div>
    <div class="row home-row-small bg-info justify-content-center">
      <div class="col-6 text-center text-box mt-4">
        <h2 class="text-dark">Take control of your childrens education.</h2>
        <h2 class="text-dark">Ditch the hassle and start using HomeScholar today!</h2>
      </div>

      <div class="col-7 text-center">
        <button class="btn-lg btn-success">Sign up</button>
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
  computed: {},
  methods: {},
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
  height: 300px;
}
.jumbotron {
  background-color: $yellow;
}
.text-box {
  height: 10vh;
}
</style>