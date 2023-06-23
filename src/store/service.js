import axios from 'axios';
import Cookies from 'js-cookie';

export default {
    state: {
        service: [],
        serviceInfo: [],
    },
    mutations: {
        setService(state, service, imageUrl){
            state.service = service
        },
        clearService(state){
            state.service = {}
        },
        setServiceIds(state, serviceInfo, imageUrl){
            state.serviceInfo = serviceInfo
            state.serviceInfo.image = imageUrl
        }
        
    },
    actions: {
 
        async allServices({commit}){
            try {
              const response = await axios.get('http://localhost:5050/posts');
              const serviceInfo = response.data;
              commit('setServiceIds', serviceInfo)  
            } catch(error) {
              console.log(error)
            }

        },

        async adminAllServices({commit}){
            
            try {
                const token = Cookies.get('token');
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
              const response = await axios.get('http://localhost:5050/posts/admin');
              const serviceInfo = response.data;
              commit('setServiceIds', serviceInfo)  
            } catch(error) {
              console.log(error)
            }

        }
    },
    getters: {
        service: $ => $.service,
        serviceInfo: $ => $.serviceInfo,

    }
}