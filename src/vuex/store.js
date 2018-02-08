import Vue from 'vue'
import Vuex from 'vuex'

import login from './login'
import product from './product'

Vue.use(Vuex)



export default new Vuex.Store({
  modules:{
    login,
    product
  }
})
