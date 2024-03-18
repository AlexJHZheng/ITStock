// store/index.js
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 定义应用的状态
    count: 0,
    username: "",
    token: "",
  },
  mutations: {
    // 定义改变状态的同步方法
    increment(state) {
      state.count++;
    },
    updateUsername(state, username) {
      state.username = username;
    },
    //通用的update方法
    updateState(state, payload) {
      state[payload.key] = payload.value;
    },
    //通用的delete方法
    deleteState(state, key) {
      delete state[key];
    },
  },
  actions: {
    // 定义触发状态改变的方法，可以是异步的
    incrementAsync({ commit }) {
      setTimeout(() => {
        commit("increment");
      }, 1000);
    },
  },
  getters: {
    // 定义从状态派生的值
    doubleCount: (state) => state.count * 2,
  },
});
