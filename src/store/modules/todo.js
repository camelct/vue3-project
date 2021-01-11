// initial state
// shape: [{ id, quantity }]
const initialState = {
  todos: [],
};

// getters
const initialgetters = {
  getTodoList: (state, getters, rootState) => {
    return state.todos;
  },
};

// actions
const actions = {
  addTodo({ commit }, text) {
    commit("addTodo", {
      text,
      done: false,
    });
  },

  removeTodo({ commit }, todo) {
    commit("removeTodo", todo);
  },

  toggleTodo({ commit }, todo) {
    commit("editTodo", { todo, done: !todo.done });
  },

  editTodo({ commit }, { todo, value }) {
    commit("editTodo", { todo, text: value });
  },

  toggleAll({ state, commit }, done) {
    state.todos.forEach(todo => {
      commit("editTodo", { todo, done });
    });
  },

  clearCompleted({ state, commit }) {
    state.todos
      .filter(todo => todo.done)
      .forEach(todo => {
        commit("removeTodo", todo);
      });
  },
};

// mutations
const mutations = {
  addTodo(state, todo) {
    state.todos.push(todo);
  },

  removeTodo(state, todo) {
    state.todos.splice(state.todos.indexOf(todo), 1);
  },

  editTodo(state, { todo, text = todo.text, done = todo.done }) {
    const index = state.todos.indexOf(todo);

    state.todos.splice(index, 1, {
      ...todo,
      text,
      done,
    });
  },
};

export default {
  namespaced: true,
  state: initialState,
  getters: initialgetters,
  actions,
  mutations,
};
