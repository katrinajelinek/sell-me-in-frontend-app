import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import UsersShow from "../views/UsersShow.vue";
import UsersEdit from "../views/UsersEdit.vue";
import PostsShow from "../views/PostsShow.vue";
import PostsNew from "../views/PostsNew.vue";
import PostsEdit from "../views/PostsEdit.vue";
import CategoriesIndex from "../views/CategoriesIndex.vue";
import CategoriesShow from "../views/CategoriesShow.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  { 
    path: "/signup", 
    name: "signup", 
    component: Signup 
  },
  { 
    path: "/login", 
    name: "login", 
    component: Login 
  },
  { 
    path: "/logout", 
    name: "logout", 
    component: Logout 
  },
  { 
    path: "/users/edit/:id", 
    name: "users-edit", 
    component: UsersEdit
  },
  { 
    path: "/users/:id", 
    name: "users-show", 
    component: UsersShow
  },
  { 
    path: "/posts/new", 
    name: "posts-new", 
    component: PostsNew
  },
  { 
    path: "/posts/:id", 
    name: "posts-show", 
    component: PostsShow
  },
  { 
    path: "/posts/edit/:id", 
    name: "posts-edit", 
    component: PostsEdit
  },
  { 
    path: "/categories", 
    name: "categories-index", 
    component: CategoriesIndex
  },
  { 
    path: "/categories/:id", 
    name: "categories-show", 
    component: CategoriesShow
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router;
