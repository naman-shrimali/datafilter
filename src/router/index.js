import Vue from "vue";
import VueRouter from "vue-router";
import VuePapaParse from 'vue-papa-parse'
Vue.use(VuePapaParse)
import Home from "../views/Home.vue";
import dataFilter from '../views/datafilter.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: '/datafilter',
    name: 'datafilter',
    component: dataFilter,
    props: true,
  },
  {
    path: "*",
    name: "notFound",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "NotFound" */ "../views/NotFound.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
