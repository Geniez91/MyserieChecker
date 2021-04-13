import React, {useContext,useState } from 'react'
import { View,Text,TextInput,StyleSheet,Button, } from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { TouchableOpacity } from 'react-native'
import {firebaseContext} from '../Components/Firebase'






const Connexion=(props)=>{

var firebase=useContext(firebaseContext)
    const [cacherMotPasse, setcacherMotPasse] = useState(true)
    const [email, setemail] = useState(null)
    const [password, setpassword] = useState(null)
    const [error, seterror] = useState(null)
    

      const ModifierEmail=(value)=>{
          setemail(value)
    }

     const ModifierPassword=(value)=>{
       setpassword(value)
    }

      const AfficherMotPasse=()=>{
      
      if(cacherMotPasse===true)
      {
        setcacherMotPasse(false)
      }
      else{
        setcacherMotPasse(true)
      }
       
    }
      const gererConnexion=(e)=>{
       e.preventDefault()
       firebase.loginuser(email,password)
       .then(user=>{
           console.log('Connexion réussi')
          setemail(null)
          setpassword(null)

         props.navigation.navigate('Recherche')
       })
       .catch(error=>{
           console.log('Echec')
         setemail(null)
         setpassword(null)
         seterror(null)
       })
      
     
    }
    const LienInscription=()=>{
      props.navigation.navigate('Inscription')
    }    
    const styles=StyleSheet.create({
    TextInput: {
        height:40,
       
    },
    CadreTextInput:{
        borderWidth:1,
        borderColor:'grey',
        marginLeft:4,
        marginRight:4,
        marginTop:3,
        marginBottom:6,
        flexDirection:'row'
    },
    centre:{
       marginTop:5
    },
    connexionheader:{
        alignItems:'center',
        marginTop:5,
    },
    textconnexion:{
        fontSize:20
    },
    ViewButton:{
        marginLeft:3,
        marginRight:3
    },
    TouchableFont:{
        marginLeft:220
    },
    main_container:{
      marginLeft:4,
      marginRight:4,
      borderColor:'black',
      borderWidth:1,
      marginTop:4,
      borderRadius:10,
      backgroundColor:'lightblue'
      
    },
    VueInscription:{
      marginTop:5,
      marginLeft:3,
      marginBottom:3
    },
    TextInscription:{
      fontStyle:'italic',
      color:'blue'
    }

  
    
   
})



   return (
            <View style={styles.main_container}>
            <View style={styles.connexionheader}>
            <Text style={styles.textconnexion}><FontAwesome5Icon size={32} name={'user-circle'} color={'green'} brand></FontAwesome5Icon> Connexion</Text>
            </View>
           <View style={styles.centre}>
           <View style={styles.CadreTextInput}>
           
              <TextInput style={{height:40}} placeholder='  Adresse Email' placeholderTextColor={'grey'} textContentType={'emailAddress'} keyboardType={'email-address'} maxLength={70} onChangeText={(value)=>ModifierEmail(value)} value={email}></TextInput>
           </View>
           </View>
        
           <View style={styles.CadreTextInput}>
           <View style={styles.ViewTextInput}>
              <TextInput style={{height:40}} placeholder=' Mot de Passe ' placeholderTextColor={'grey'} textContentType='password' secureTextEntry={cacherMotPasse}  value={password} onChangeText={(value)=>ModifierPassword(value)} ></TextInput>
              </View>
              <TouchableOpacity style={styles.TouchableFont} onPress={()=>AfficherMotPasse()}>
                <FontAwesome5Icon name='eye' size={32} color={'orange'} solid></FontAwesome5Icon>
              </TouchableOpacity>
           </View>
           <View style={styles.ViewButton}>
           <Button title='Valider' onPress={(e)=>gererConnexion(e)}></Button>
           </View>
           <TouchableOpacity onPress={()=>LienInscription()}>
           <View style={styles.VueInscription}>
           <Text style={styles.TextInscription}>Pas encore Membre ? Inscrivez-vous ! </Text>
           </View>
           </TouchableOpacity>
           </View>
        )
    }
    


    



export default Connexion
