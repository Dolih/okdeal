/* eslint-disable */
import axios from 'axios';
import Cookies from 'js-cookie'
export default{
    state: {
        info: {}
    },
    mutations: {
        setInfo(state, info){
            state.info = info
        },
        clearInfo(state){
            state.info = {}
        }
    },

    actions : {
        async fetchInfo({commit}) {
            const token = Cookies.get('token')
            try {
              const response = await axios.get('http://localhost:5050/users', {headers: {
                  Authorization: `Bearer ${token}`
              }});
              const info = response.data;
              commit('setInfo', info)
            } catch(error) {
              console.log(error)
            }
          }
    },
    getters: {
        info : $ => $.info
    }
}