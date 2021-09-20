import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

/**
 * Routes uses lazy loading.
 */
const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/trivia",
    name: "Trivia",
    component: () => import("@/views/Trivia.vue"),
  },
  {
    path: "/result",
    name: "Result",
    component: () => import("@/views/Result.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
