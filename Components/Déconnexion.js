import React,{useContext} from 'react'
import { View, } from 'react-native'
import {firebaseContext} from '../Components/Firebase'


function Déconnexion(props) {
const firebase = useContext(firebaseContext)
firebase.auth().signOut().then(()=>{
    props.navigation.navigate('Connexion')
})
    return (
        <View></View>
    )
}

export default Déconnexion
