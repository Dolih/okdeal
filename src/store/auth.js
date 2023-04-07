import firebase from "firebase/app"
/* eslint-disable */
export default{
    actions: {
        async login({dispatch, commit},{email, password}) {
            try{
                await firebase.auth().signInWithEmailAndPassword(email, password)
            }
            catch(error){
                commit('setError', error)
                throw error
            }
        },

        async register({dispatch}, {email, password, name, phone}){
            try{
                await firebase.auth().createUserWithEmailAndPassword(email, password)
                const uid = await dispatch('getUid')
                await firebase.database().ref(`/users/${uid}/info`).set({
                    name, phone
                })
                await firebase.database().ref(`/users/${uid}/services`)
            }
            catch(error){
                throw error
            }
        },

        getUid(){
            const user = firebase.auth().currentUser
            return user ? user.uid : null
        },
        // getSid(){
        //     const user = firebase.auth().currentUser
        //     const service = user.child('services').push()
        // },

        async logout(dispatch){
            await firebase.auth().signOut()
            await commit('clearInfo')
        }
    }
}