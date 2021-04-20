const state = {
  userInfo: {
    nickname: "",
    email: "",
    token: "",
    userId: 0
  },
  userStatus: false
};

const mutations = {
  saveUserInfo(state, payload) {
    localStorage.setItem("inTravel-userinfo", JSON.stringify(payload));
    localStorage.setItem("inTravel-userinfo-token", payload.token);
    state.userInfo = payload;
    state.userStatus = true;
  },
  clearUserInfo(state) {
    localStorage.removeItem("inTravel-userinfo");
    localStorage.removeItem("inTravel-userinfo-token");
    state.userInfo = {};
    state.userStatus = false;
  },
  checkUserInfo(state) {
    const data = JSON.parse(localStorage.getItem("inTravel-userinfo")) || {};
    if (data && data.token) {
      state.userStatus = true;
      state.userInfo = data;
    } else {
      state.userStatus = false;
      state.userInfo = {};
    }
  }
};

const actions = {
  // showAlert({ state, rootState, commit, dispatch, getters }, payload) {
  //   commit('setAlertStaus', payload);
  // },
};

const getters = {
  userInfo: state => state.userInfo,
  userStatus: state => state.userStatus
};

export default {
  state,
  actions,
  getters,
  mutations
};
