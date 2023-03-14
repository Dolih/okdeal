import firebase from "firebase/app"
/* eslint-disable */
export default{
    actions: {
        async addService({dispatch}, {service, trade, description, city}){
            try{
                const uid = await dispatch('getUid')
                var serviceRef = firebase.database().ref(`users/${uid}/services`)
                const newServiceRef = serviceRef.child(uid).push()
                const serviceId = newServiceRef.key
                

                await firebase.database().ref(`/users/${uid}/services/${serviceId}`).set({
                    service, trade, description, city
                })//создать переменную котора будет хранить ид услуги
            }
            catch(error){
                throw error
            }
        },
        
        
    }
}