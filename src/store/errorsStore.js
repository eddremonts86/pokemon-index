const errorsStore = {
  namespaced: true,
  state: { hasErrors: false, errorMessage: { type: "error", text: "" } },
  getters: {
    hasErrors(state) {
      return state.hasErrors;
    },
    getErrorMessage(state) {
      return state.errorMessage;
    },
  },
  mutations: {
    clearErrorMessage(state) {
      state.hasErrors = false;
    },
    setSystemErrors(state, error) {
      state.hasErrors = true;
      state.errorMessage = error;
    },
  },
  actions: {
    clearErrorMessage({ commit }) {
      commit("clearErrorMessage");
    },
  },
};
export default errorsStore;
