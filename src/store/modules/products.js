import shop from "../actions/shop";

// initial state
const initialState = () => ({
  all: [],
});

// getters
const initialgetters = {};

// actions
const actions = {
  getAllProducts({ commit }) {
    shop.getProducts(products => {
      commit("setProducts", products);
    });
  },
};

// mutations
const mutations = {
  setProducts(state, products) {
    state.all = products;
  },

  decrementProductInventory(state, { id }) {
    const product = state.all.find(productItem => productItem.id === id);
    product.inventory--;
  },
};

export default {
  namespaced: true,
  state: initialState,
  getters: initialgetters,
  actions,
  mutations,
};
