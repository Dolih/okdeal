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

            
                const snapshot = await servicesRef.once('value'); // используем await для дожидания выполнения функции
                const services = snapshot.val();
                const serviceIds = Object.keys(services);
                const serviceInfo = (await firebase.database().ref(`/users/${uid}/services/${serviceIds[1]}`).once('value')).val()
                commit('setServiceIds', serviceInfo);   
        }
    },
    getters: {
        service: $ => $.service,
        serviceInfo: $ => $.serviceInfo
    }
}