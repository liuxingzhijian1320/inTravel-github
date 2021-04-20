const state = {
  modelShow: false,
  modelData: {}
};

const mutations = {
  setShowStatus(state, payload) {
    state.modelShow = payload;
    if (!payload) {
      this.commit("setModelData", {});
    }
  },
  setModelData(state, payload) {
    state.modelData = payload;
  }
};

const actions = {
  // showAlert({ state, rootState, commit, dispatch, getters }, payload) {
  //   commit('setAlertStaus', payload);
  // },
};

const getters = {
  modelShow: state => state.modelShow,
  modelData: state => state.modelData
};

export default {
  state,
  actions,
  getters,
  mutations
};
