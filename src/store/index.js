import { createStore } from 'vuex'
import auth from './auth.js'
import info from './info.js'
import addService from './addService.js'
import service from './service.js'
import categories from './categories.js'
export default createStore({
  state: {
    error: null
  },
  mutations: {
    setError(state, error){
      state.error = error
    },
    clearError(state){
      state.error = null
    }
  },
  actions: {
  },
  getters: {
    error: s => s.error
  },
  modules: {
    auth, info, addService, service, categories
  }
})
