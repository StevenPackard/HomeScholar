import Vue from "vue";
import Router from "vue-router";
// @ts-ignore
import Home from "../views/Home.vue";
// @ts-ignore
import Dashboard from "../views/Dashboard.vue";
// @ts-ignore
import StudentDetails from "../views/StudentDetails.vue";
// @ts-ignore
import Posts from "../views/Posts.vue";
// @ts-ignore
import PostDetails from "../views/PostDetails.vue";
// @ts-ignore
import Transcript from "../views/Transcript.vue";
// @ts-ignore
import Tour from "../views/TourPage.vue";
import { authGuard } from "@bcwdev/auth0-vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
      beforeEnter: authGuard,
    },
    {
      path: "/student/:id",
      name: "student-details",
      component: StudentDetails,
      beforeEnter: authGuard,
    },
    {
      path: "/posts",
      name: "posts",
      component: Posts,
      beforeEnter: authGuard,
    },
    {
      path: "/postDetails/:id",
      name: "postDetails",
      component: PostDetails,
      beforeEnter: authGuard,
    },
    {
      path: "/transcript/:id",
      name: "transcript",
      component: Transcript,
      beforeEnter: authGuard,
    },
    {
      path: "/tour",
      name: "tour",
      component: Tour,
    },
    {
      path: "*",
      redirect: "/",
    },
  ],
});
