import Vuex from 'vuex'

import about from "./modules/about";
import login from "./modules/login"

export default new Vuex.Store({
  modules: {
    about,
    login,
  },
})