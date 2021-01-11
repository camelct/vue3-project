import { createStore, createLogger } from "vuex";
import cart from "./modules/cart";
import products from "./modules/products";
import todo from "./modules/todo";

const debug = process.env.NODE_ENV !== "production";

export default createStore({
  modules: {
    cart,
    products,
    todo,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});
