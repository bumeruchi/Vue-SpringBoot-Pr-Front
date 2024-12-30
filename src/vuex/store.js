import { createStore } from "vuex";
import getters from "./getters.js";
import mutations from "./mutations";
import actions from "./actions.js";
export default createStore({
  state: {
    user: null,
    isLogin: false,
  },
  mutations,
  getters,
  actions,
});
