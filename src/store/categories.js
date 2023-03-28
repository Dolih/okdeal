import firebase from 'firebase/app'

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
            const servicesRef = firebase.database().ref(`/categories`);
            const snapshot = await servicesRef.once('value'); 
            const categories = snapshot.val();
            const categoriesIds = Object.keys(categories);
            let categoriesInfo = []                
            for(let i = 0; i<categoriesIds.length; i++){
                let categoriesInf = (await firebase.database().ref(`/categories/${categoriesIds[i]}`).once('value')).val()
                categoriesInfo.push(categoriesInf);
            }
            commit('setCategories', categoriesInfo)  
        }
    },
    getters: {
        categories: state => state.categories
    }
}