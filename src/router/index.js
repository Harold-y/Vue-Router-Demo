import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Jobs from "../views/jobs/Jobs.vue";
import JobDetails from "../views/jobs/JobDetails.vue";
import NotFound from "../views/NotFound.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/jobs",
    name: "jobs",
    component: Jobs,
  },
  {
    path: "/jobs/:id",
    name: "jobDetails",
    component: JobDetails,
    props: true, // can accept route parameter as props
  },
  // redirect
  {
    path: "/all-jobs",
    redirect: "/jobs",
  },
  // catchall 404
  {
    path: "/:catchAll(.*)", // regex, catch all that does not match any of the above
    name: "Not Found",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
