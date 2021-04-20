import { judgerColorRule } from "../../assets/scripts/utils";

const state = {
  defaultColor: "#13c2c2", // 默认皮肤设置
  currentColor: "#13c2c2"
};

const mutations = {
  setSkinColor(state, payload) {
    state.currentColor = judgerColorRule(payload)
      ? payload
      : state.defaultColor;
    localStorage.setItem("inTravel-userinfo-skin", state.currentColor);
    window.document.body.setAttribute("data-theme", state.currentColor);
  },
  getSkinColor(state) {
    let color = localStorage.getItem("inTravel-userinfo-skin");
    state.currentColor = judgerColorRule(color) ? color : state.defaultColor;
    window.document.body.setAttribute("data-theme", state.currentColor);
  }
};

const actions = {
  // showAlert({ state, rootState, commit, dispatch, getters }, payload) {
  //   commit('setAlertStaus', payload);
  // },
};

const getters = {
  currentColor: state => state.currentColor
};

export default {
  state,
  actions,
  getters,
  mutations
};
