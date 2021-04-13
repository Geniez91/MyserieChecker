import React,{useEffect,useState,useContext } from 'react'
import { Button } from 'react-native';
import { View,Text,StyleSheet,TextInput,ActivityIndicator,TouchableOpacity,Alert } from 'react-native'
import DatePicker from 'react-native-datepicker';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {firebaseContext} from "./Firebase/"



function Compte(props) {
  console.log("Props"+props)
  const styles=StyleSheet.create({
    main_container:{
      marginLeft:4,
      marginRight:4,
      marginTop:4,
     
    },
    borderCompte:{
      borderWidth:1,
      borderColor:'black',
      borderRadius:10,
       backgroundColor:'lightblue'
    },
    VueTextCompte:{
      alignItems:'center'
    },
    TextCompte:{
fontSize:18,
fontWeight:'bold'
    },
    bodyCompte:{
      marginTop:5
    },
    VuePseudo:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center'
    },
    VuePassword:{
       flexDirection:'row',
      alignItems:'center',
      justifyContent:'center'
    },
    VueEmail:{

    },
    InformationPersonnelles:{
      marginTop:4,
      alignItems:'center',
     
    },
    TextInfoPerso:{
      fontWeight:'bold'
    },
    borderinfoperso:{
      borderTopColor:'black',
      borderTopWidth:1,
      marginTop:3
    },
    TouchableIcon:{
      marginLeft:4,
      marginBottom:15
    },
    fontBlack:{
      color:'black'
    },
    bold:
    {
      fontWeight:'bold'
    },
    VueModifier:{
     marginTop:5
    }
  })
  const firebase = useContext(firebaseContext)
  const [usersession, setusersession] = useState(null)
  const [userdata, setuserdata] = useState(null)
  const [editPseudo, seteditPseudo] = useState(false)
  const [editPassword, seteditPassword] = useState(false)
  const [editEmail, seteditEmail] = useState(false)
  const [editNom, seteditNom] = useState(false)
  const [editPrenom, seteditPrenom] = useState(false)
  const [editDescription, seteditDescription] = useState(false)

  const [Pseudo, setPseudo] = useState(null)
  const [Password, setPassword] = useState(null)
  const [Email, setEmail] = useState(null)
  const [Nom, setNom] = useState(null)
  const [Prenom, setPrenom] = useState(null)
  const [Description, setDescription] = useState(null)

  
  const TraitementModif=(e)=>{
    e.preventDefault()
    return firebase.db().collection('users').doc(usersession.uid).update({
      Pseudo:Pseudo,
      Password:Password,
      Email:Email,
      Nom:Nom,
      Prenom:Prenom,
      Description:Description
    })
    .then(function(){
      Alert.alert('Mise à jour du Compte effectué')
    })
    .catch(function(error){
      console.log(error)
    })
  }
 const  ModifierPseudo=()=>{
seteditPseudo(true)
setPseudo()
  }

  useEffect(() => {
  let listener=firebase.auth().onAuthStateChanged(user=>{
    user?(setusersession(user)):(props.navigation.navigate('Connexion'))
  })
  if(usersession!==null){
    firebase.user(usersession.uid)
    .get()
    .then((doc)=>{///Verifie l'utilisateur existe
if(doc&& doc.exists)
{
  const donnes=doc.data()//Ici on récupere les donnes de l'utilisateur
  setuserdata(donnes)
  setPseudo(userdata.Pseudo)
  setPassword(userdata.Password)
  setEmail(userdata.Email)
  setPrenom(userdata.Prenom)
  setNom(userdata.Nom)
  setDescription(userdata.Description)
}
    })
  .catch((error)=>{
    console.log(error)
  })
  }
  return ()=>{
    listener()//pour arreter la methode listener
  }

  },[usersession])
console.log(userdata)
if(userdata!==null)
{
  
return (
  
      <View style={styles.main_container}>
      <View style={styles.borderCompte}>
        <View style={styles.VueTextCompte}>
          <Text style={styles.TextCompte}>Mon Compte</Text>
          </View>
          <View style={styles.bodyCompte}>
          <View style={styles.VuePseudo}>
          <FontAwesome5Icon name='user' size={20} style={{marginRight:3}}></FontAwesome5Icon>
          <Text style={styles.bold}>Pseudo : </Text>
            <TextInput value={Pseudo} editable={editPseudo} style={styles.fontBlack} onChangeText={(e)=>setPseudo(e)}></TextInput>
            <TouchableOpacity style={styles.TouchableIcon} onPress={()=>ModifierPseudo()}>
              <FontAwesome5Icon name='edit' size={18} color='yellow' solid ></FontAwesome5Icon>
            </TouchableOpacity>
            
          </View>
          <View style={styles.VuePseudo}>
           <FontAwesome5Icon name='lock' size={20} style={{marginRight:4}} color='green'></FontAwesome5Icon>
            <Text style={styles.bold}>Mot de Passe : </Text>
            <TextInput value={Password} editable={editPassword} style={styles.fontBlack} onChangeText={(e)=>setPassword(e)}></TextInput>
            <TouchableOpacity style={styles.TouchableIcon} onPress={()=>seteditPassword(true)}>
              <FontAwesome5Icon name='edit' size={18} color='yellow' solid></FontAwesome5Icon>
            </TouchableOpacity>
          </View>
           <View style={styles.VuePseudo}>
            <FontAwesome5Icon name='envelope' size={20} style={{marginRight:5}} color='red'></FontAwesome5Icon>
            <Text style={styles.bold}>Email : </Text>
            <TextInput value={Email} editable={editEmail} style={styles.fontBlack} onChangeText={(e)=>setEmail(e)}></TextInput>
             <TouchableOpacity style={styles.TouchableIcon} solid onPress={()=>seteditEmail(true)}>
              <FontAwesome5Icon name='edit' size={18} solid color='yellow'></FontAwesome5Icon>
            </TouchableOpacity>
          </View>
          <View style={styles.borderinfoperso}>

          </View>
          <View style={styles.InformationPersonnelles}>
          <Text style={styles.TextInfoPerso}>Informations Personnelles</Text>
          
          <View style={styles.VuePseudo}>
          <FontAwesome5Icon name='user' size={20} style={{marginRight:3}}></FontAwesome5Icon>
            <Text style={styles.bold}>Nom : </Text>
            <TextInput value={Nom} editable={editNom} style={styles.fontBlack} onChangeText={(e)=>setNom(e)}></TextInput>
             <TouchableOpacity style={styles.TouchableIcon} onPress={()=>seteditNom(true)}>
              <FontAwesome5Icon name='edit' size={18} solid color='yellow'></FontAwesome5Icon>
            </TouchableOpacity>
            
          </View>
          <View style={styles.VuePseudo}>
          <FontAwesome5Icon name='user' size={20} style={{marginRight:3}}></FontAwesome5Icon>
            <Text style={styles.bold}>Prenom : </Text>
            <TextInput value={Prenom} editable={editPrenom} style={styles.fontBlack} onChangeText={(e)=>setPrenom(e)}></TextInput>
             <TouchableOpacity style={styles.TouchableIcon} onPress={()=>seteditPrenom(true)}>
              <FontAwesome5Icon name='edit' size={18} solid color='yellow'></FontAwesome5Icon>
            </TouchableOpacity>
          </View>
          <View style={styles.VuePseudo}>
            <Text style={styles.bold}>Date de Naissance : </Text>
            <DatePicker mode='date' format='DD/MM/YYYY' date={userdata.Datenaissance}></DatePicker>
          </View>
          <View style={styles.VuePseudo}>
           <FontAwesome5Icon name='edit' size={18} style={{marginRight:2}}></FontAwesome5Icon>
            <Text style={styles.bold}>Une phrase pour vous décrire : </Text>
            <TextInput value={Description} editable={editDescription} style={styles.fontBlack} onChangeText={(e)=>setDescription(e)}></TextInput>
             <TouchableOpacity style={styles.TouchableIcon} onPress={()=>seteditDescription(true)}>
              <FontAwesome5Icon name='edit' size={18} solid color='yellow'></FontAwesome5Icon>
            </TouchableOpacity>
          </View>

          </View>


          </View>
          </View>
          <View style={styles.VueModifier}>
            <Button title='Modifier' color='green' onPress={(e)=>TraitementModif(e)} ></Button>
          </View>
      </View>
    )
}
else
{
 return <View>
     <ActivityIndicator size="large" color="#00ff00" />
  </View>
}
    
}
const mapStateToProps=(state)=>{
  return{
    username:state.username
  }
}


export default Compte

