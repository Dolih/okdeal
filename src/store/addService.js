import firebase from "firebase/app"
import "firebase/storage"
/* eslint-disable */
export default{
    actions: {
        async addService({dispatch}, {service, trade, description, city, imageURL, selectedCategory, date}){
            try{
                const uid = await dispatch('getUid')
                var serviceRef = firebase.database().ref(`users/${uid}/services`)
                const newServiceRef = serviceRef.child(uid).push()
                const serviceId = newServiceRef.key
                

                await firebase.database().ref(`/users/${uid}/services/${serviceId}`).set({
                    service, trade, description, city, imageURL, selectedCategory, date
                })
            }

            catch(error){
                throw error
            }
        },
        
        
    }
}