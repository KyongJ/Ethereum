import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "../layout/index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Layout,
    children:[
        { 
            path: "",
            name: "首页",
            icon: "iconfont el-icon-myshouye",
            component: () => import("../views/Home/home.vue")
        }
    ]
  },
  {
    path: "/uug",
    name: "UUG",
    icon: "iconfont el-icon-mywenzhang-copy",
    redirect: "/uug",
    component: Layout,
    children: [
      // {
      //   path: "/uugData",
      //   name: "UUG数据",
      //   icon: "iconfont el-icon-myfabiaowenzhang",
      //   component: () => import("../views/UUG/uug.vue"),
      // },
      {
        path: "/uug/graph-size",
        name: "Graph size",
        icon: "iconfont el-icon-myfabiaowenzhang",
        component: () => import("../views/UUG/graph-size.vue"),
      },
      {
        path: "/uug/degree",
        name: "Degree",
        icon: "iconfont el-icon-myfabiaowenzhang",
        component: () => import("../views/UUG/degree.vue"),
      },
      {
        path: "/uug/edg-weight",
        name: "Edg Weight",
        icon: "iconfont el-icon-myfabiaowenzhang",
        component: () => import("../views/UUG/edg-weight.vue"),
      },
      {
        path: "/uug/motifis",
        name: "Motifis",
        icon: "iconfont el-icon-myfabiaowenzhang",
        component: () => import("../views/UUG/motifis.vue"),
      },
    ]
  },
  {
    path: "/ucg",
    name: "UCG",
    icon: "iconfont el-icon-mywenzhang-copy",
    redirect: "/ucg",
    component: Layout,
    children: [
      {
        path: "/ucgData",
        name: "UCG数据",
        icon: "iconfont el-icon-myfabiaowenzhang",
        component: () => import("../views/UCG/ucg.vue"),
      },
    ]
  },
  {
    path: "/ccg",
    name: "CCG",
    icon: "iconfont el-icon-mywenzhang-copy",
    redirect: "/ccg",
    component: Layout,
    children: [
      {
        path: "/ccgData",
        name: "CCG数据",
        icon: "iconfont el-icon-myfabiaowenzhang",
        component: () => import("../views/CCG/ccg.vue"),
      },
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
