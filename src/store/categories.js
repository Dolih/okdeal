import firebase from 'firebase/app'
import axios from 'axios';

export default {
    state: {
        categories: []
    },
    mutations: {
  
        clearCategories(state){
            state.categories = {}
        },
        setCategories(state, categories){
            state.categories = categories
        }
        
    },
    actions: {
        
        async allCategories({ commit}) {
            const response = await axios.get('http://localhost:5050/categories');
            const categoriesInfo = response.data;
            commit('setCategories', categoriesInfo)  
        }
    },
    getters: {
        categories: state => state.categories
    }
}