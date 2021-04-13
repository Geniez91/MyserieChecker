import React, { Component,useState,useContext } from 'react'
import { View,Text,TextInput,StyleSheet } from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-datepicker';
import { Button } from 'react-native';
import {firebaseContext} from '../Components/Firebase'


function Inscription(props) {
    var firebase=useContext(firebaseContext)
    const [email, setemail] = useState(null)
    const [password, setpassword] = useState('')
    const [pseudo, setpseudo] = useState(null)
    const [nom, setnom] = useState(null)
    const [prenom, setprenom] = useState(null)
    const [datenaiss, setdatenaiss] = useState(null)
    const [description, setdescription] = useState(null)
    
    const TraitementInscription=()=>{
        console.log(email)
        console.log(password)
        console.log(pseudo)
        console.log(nom)
        console.log(prenom)
        console.log(datenaiss)
        console.log(description)
      firebase.signupuser(email,password)
      .then((authUser)=>{

        console.log('authUser.user')
return firebase.user(authUser.user.uid).set({
       Datenaissance:datenaiss,
    Description:description,
    Nom:nom,
    Prenom:prenom,
    Email:email,
    Password:password,
    Pseudo:pseudo
})
.then(user=>{
    setemail('')
    setpassword('')
    setnom('')
    setprenom('')
    setprenom('')
    setdatenaiss('')
    setdescription('')
    props.navigation.navigate('Recherche')
})
      })
    }


     const style=StyleSheet.create({
    main_container:{
        marginLeft:5,
        marginRight:5
    },
    InformationCom:{
        borderWidth:1,
        borderColor:'grey',
        marginTop:5,
         borderRadius:5
    },
    border:{
        borderBottomColor:'grey',
        borderBottomWidth:1,
        marginBottom:10
    },
    Vue:{
        flexDirection:'row'
    },
    InfoPerso:{
        borderColor:'gray',
        borderWidth:1,
        marginTop:5,
        borderRadius:5
    },
    vuebutton:{
        marginTop:5
    },
    nom:{
        flexDirection:'row'
    },
    prenom:{
        flexDirection:'row'
    },
    description:{
        flexDirection:'row'
    },
    marginLeft:
    {
        marginLeft:3
    }
})
    return (
         <View style={style.main_container}>
               <View>
                   <View style={style.InformationCom}>
                   <View style={[style.border,style.Vue]}>
                    <FontAwesome5Icon name='envelope' size={32}></FontAwesome5Icon>
                    <View style={style.marginLeft}>
                       <TextInput placeholder=' Email' value={email} onChangeText={(value)=>setemail(value)}></TextInput>
                       </View>
                       </View>
                    <View style={[style.border,style.Vue]}>
                     <FontAwesome5Icon name='lock' size={32}></FontAwesome5Icon>
                      <View style={style.marginLeft}>
                     <TextInput placeholder={' Mot de Passe'} value={password} onChangeText={(value)=>setpassword(value)}></TextInput>
                    </View>
                       
                       </View>
                    <View style={style.Vue} > 
                    <FontAwesome5Icon name='user' size={32}></FontAwesome5Icon>
                    <View style={style.marginLeft}>
                       <TextInput placeholder='Pseudo' value={pseudo} onChangeText={(value)=>setpseudo(value)}></TextInput>
                      </View>
                       </View>
                    



                   </View>
                   <View style={style.InfoPerso}>
                    <Text> Vos Informations Personnels</Text>
                    <View style={[style.nom,style.border]}>
                    <FontAwesome5Icon name='user' size={32}></FontAwesome5Icon>
                     <View style={style.marginLeft}>
                        <TextInput placeholder='Nom' value={nom} onChangeText={(value)=>setnom(value)}></TextInput>
                        </View>
                    </View>
                    <View style={[style.prenom,style.border]}>
                    <FontAwesome5Icon name='user' size={32}></FontAwesome5Icon>
                    <View style={style.marginLeft}>
                        <TextInput placeholder='Prenom' value={prenom} onChangeText={(value)=>setprenom(value)}></TextInput>
                        </View>
                    </View>

                    <View style={[style.vuedate,style.border]}>
                    <Text>Date de Naissance</Text>
                    <DatePicker mode='date' format='DD/MM/YYYY' date={datenaiss} customStyles={{
            dateIcon: {
              //display: 'none',
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
          }}
          onDateChange={(value)=>setdatenaiss(value)}
          >
            
                    </DatePicker>
                    </View>
                    <View style={style.description}>
                    
                    <FontAwesome5Icon name='edit' size={32}></FontAwesome5Icon>
                    <Text> Description</Text>
                    
                    </View>
                        <TextInput placeholder='Ecrivez quelques lignes pour vous décrire' multiline={true} onChangeText={(value)=>setdescription(value)} value={description}></TextInput>
                    
                    
        
                   </View>
                   <View style={style.vuebutton}>
                       <Button title='Confirmer' onPress={()=>TraitementInscription()}></Button>
                   </View>
               </View>
            </View>
    )
   
    
}


export default Inscription


