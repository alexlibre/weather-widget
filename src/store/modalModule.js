export const modalModule = {
  state: () => {
    return {
      isOpened: false
    }
  },
  mutations: {
    showModal(state, bool) {
      state.isOpened = bool;
    },
  },
  namespaced: true
}