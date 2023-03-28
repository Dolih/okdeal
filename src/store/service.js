import firebase from 'firebase/app'

export default {
    state: {
        service: {},
        serviceInfo: []
    },
    mutations: {
        setService(state, service){
            state.service = service
        },
        clearService(state){
            state.service = {}
        },
        setServiceIds(state, serviceInfo){
            state.serviceInfo = serviceInfo
        }
        
    },
    actions: {
        
        async idServices({dispatch, commit}) {
            const uid = await dispatch('getUid')
            const servicesRef = firebase.database().ref(`users/${uid}/services`);
            const snapshot = await servicesRef.once('value'); 
            const services = snapshot.val();
            const serviceIds = Object.keys(services);
            let serviceInfo = []                
            for(let i = 0; i<serviceIds.length; i++){
                let serviceInf = (await firebase.database().ref(`/users/${uid}/services/${serviceIds[i]}`).once('value')).val()
                serviceInfo.push(serviceInf);
            }
            commit('setServiceIds', serviceInfo)  
        },

        async allServices({commit}){
            const usersRef = firebase.database().ref(`users/`)
            const snapshot = await usersRef.once('value')
            const users = snapshot.val()
            const usersIds = Object.keys(users)
            let serviceInfo = []
            for (let i=0; i<usersIds.length; i++){
                const servicesRef = firebase.database().ref(`users/${usersIds[i]}/services`)
                const snapshot = await servicesRef.once('value')
                const services = snapshot.val()
                const serviceIds = Object.keys(services)
                for(let b = 0; b<serviceIds.length; b++){
                    let serviceInf = (await firebase.database().ref(`/users/${usersIds[i]}/services/${serviceIds[b]}`).once('value')).val()
                    serviceInfo.push(serviceInf);
                    }
            }
            commit('setServiceIds', serviceInfo)  

        }
    },
    getters: {
        service: $ => $.service,
        serviceInfo: $ => $.serviceInfo
    }
}