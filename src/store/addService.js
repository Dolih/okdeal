import firebase from "firebase/app"
import "firebase/storage"
/* eslint-disable */
export default{
    actions: {
        async addService({dispatch}, {service, trade, description, city, imageURL, selectedCategory, phone, addDate}){
            try{
                const uid = await dispatch('getUid')
                var serviceRef = firebase.database().ref(`users/${uid}/services`)
                const newServiceRef = serviceRef.child(uid).push()
                const serviceId = newServiceRef.key
                console.log(addDate)

                await firebase.database().ref(`/users/${uid}/services/${serviceId}`).set({
                    service, trade, description, city, imageURL, selectedCategory, phone, addDate
                })
            }

            catch(error){
                throw error
            }
        },
        
        
    }
}