import Home from "../pages/Home.vue";
import About from "../pages/About.vue";
import Card from "../pages/productManage/Card.vue";
import Todo from "../pages/todoManage/Todo.vue";
import Page404 from "../layouts/404.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/about/:username", component: About },
  { path: "/card", component: Card },
  { path: "/todo", component: Todo },
  { path: "/*", component: Page404 },
];

export default routes;
