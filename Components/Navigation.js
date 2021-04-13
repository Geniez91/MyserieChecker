import React,{useContext,useState} from 'react';
import { StyleSheet,Image } from 'react-native';
import {NavigationContainer } from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import Recherche from '../Components/Recherche'
import SeriesDetails from '../Components/SeriesDetails';
import SerieSaisons from '../Components/SerieSaisons';
import DetailsSaison from '../Components/DetailsSaison';
import Favoris from '../Components/FavoriteSerie'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer'
import DetailsEpisode from '../Components/DetailsEpisode';
import Casting from '../Components/Casting';
import Connexion from '../Components/Connexion';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Inscription from '../Components/Inscription';
import Compte from '../Components/Compte';
import {firebaseContext} from '../Components/Firebase'
import Déconnexion from './Déconnexion';
import News from './News';
import SerieVue from './SerieVue';


///Page qui permet de gérer la Navigation entre les différentes pages de l'application
function Navigation(props) {
  ///Création des Stack qui permet de gérer les différentes page
    const Stack=createStackNavigator()
const StackFavorite=createStackNavigator()
const StackConnexion=createStackNavigator()
const StackInscription=createStackNavigator()
const StackCompte=createStackNavigator()
const StackNews=createStackNavigator()
const StackVue=createStackNavigator()
///Création du Tab qui permet de mettre un menu en dessous de l'application
const TabFav=createBottomTabNavigator()
const TabNonConnecte=createBottomTabNavigator()
///Création du Menu hambuger
const Drawer=createDrawerNavigator()
//Constante firebase qui permet de récuperer de gérer l'authentification et la gestion des données
const firebase = useContext(firebaseContext)
///Variable locale qui permet de gérer si un utilisateur est connecté
 const [isLogin, setisLogin] = useState(false)
  firebase.auth().onAuthStateChanged((user)=>{
    if(user){
      setisLogin(true)
    }
    else{
      setisLogin(false)
    }
  })



MyDrawer=()=>{
///Menu Hambuger
if(isLogin===true)//Verifie si l'utilisateur est connecté
{
  return(<Drawer.Navigator>
 <Drawer.Screen name='Recherche' component={MyTab} options={{drawerIcon:()=>{
      return <Image source={require('../Images/recherche.png')} style={style.icon}></Image>
    }}}></Drawer.Screen>
    <Drawer.Screen name='Mes Series Favoris' component={StackListFavorite} options={{drawerIcon:()=>{
      return <Image source={require('../Images/favorite.png')} style={style.icon}></Image>
    }}}></Drawer.Screen>
    <Drawer.Screen name='News' component={StackListNews} options={{drawerIcon:()=>{
      return <FontAwesome5 name='newspaper' size={16} color='orange'></FontAwesome5>
    }}}></Drawer.Screen>
  <Drawer.Screen name='Mes Visonnages' component={StackSerieVue} options={{drawerIcon:()=>{
      return <FontAwesome5 name='check-circle' size={16} color='green'></FontAwesome5>
    }}}></Drawer.Screen>
     <Drawer.Screen name='Compte' component={StackMyCompte} options={{drawerIcon:()=>{
      return <Image source={require('../Images/usericon.png')} style={style.icon}></Image>
    }}}></Drawer.Screen>
    


  </Drawer.Navigator>)
}
  else
  {
return(<Drawer.Navigator>
   <Drawer.Screen name='Connexion' component={StackMyConnexion} options={{drawerIcon:()=>{
      return <Image source={require('../Images/login.png')} style={style.icon}></Image>
    }}}></Drawer.Screen>
    <Drawer.Screen name='Inscription' component={StackMyInscription} options={{drawerIcon:()=>{
      return <Image source={require('../Images/Inscription.png')} style={style.icon}></Image>
    }}}></Drawer.Screen>
</Drawer.Navigator>)
  }
}

StackRecherche=()=>{
 return(  <Stack.Navigator>
        <Stack.Screen name='Recherche' component={Recherche}></Stack.Screen>
        <Stack.Screen name='Details de la Serie' component={SeriesDetails}></Stack.Screen>
        <Stack.Screen name='Les Saisons' component={SerieSaisons}></Stack.Screen>
        <Stack.Screen name='Details de la Saison' component={DetailsSaison}></Stack.Screen>
        <Stack.Screen name='Details de l episode' component={DetailsEpisode}></Stack.Screen>
        <Stack.Screen name='Le Casting' component={Casting}></Stack.Screen>
      </Stack.Navigator>)

}
StackListFavorite=()=>{
  return(
    <StackFavorite.Navigator>
      <StackFavorite.Screen name='Favoris' component={Favoris}></StackFavorite.Screen>
    </StackFavorite.Navigator>)
}
StackListNews=()=>{
  return(
    <StackNews.Navigator>
      <StackNews.Screen name='Les Dernieres Series' component={News}></StackNews.Screen>
    </StackNews.Navigator>
  )
}

StackMyConnexion=()=>{
  return(
    <StackConnexion.Navigator>
      <StackConnexion.Screen name='Connexion' component={Connexion}></StackConnexion.Screen>
    </StackConnexion.Navigator>
  )
}
StackMyInscription=()=>{
  return(
    <StackInscription.Navigator>
      <StackInscription.Screen name='Inscription' component={Inscription}></StackInscription.Screen>
    </StackInscription.Navigator>
  )
}
StackMyCompte=()=>{
  return(
    <StackCompte.Navigator>
      <StackCompte.Screen name='Compte' component={Compte}></StackCompte.Screen>
    </StackCompte.Navigator>
  )
}
StackSerieVue=()=>{
  return(
    <StackVue.Navigator>
      <StackVue.Screen name='Mes Series Vues' component={SerieVue}></StackVue.Screen>
    </StackVue.Navigator>
  )
}

MyTab=(props)=>{
  ///Menu en dessus
 if(isLogin===true)
 {
   return (<TabFav.Navigator>
      <TabFav.Screen name='Recherche' component={StackRecherche} options={{tabBarIcon:()=>{
        return <Image source={require('../Images/recherche.png')} style={style.icon}></Image>
      }}} ></TabFav.Screen>
      <TabFav.Screen name='Mes Series Favorites' component={StackListFavorite} options={{tabBarIcon:()=>{
        return <Image source={require('../Images/favorite.png')} style={style.icon}></Image>
      }}}></TabFav.Screen>
      <TabFav.Screen name='News' component={StackListNews} options={{tabBarIcon:()=>{
        return <FontAwesome5 name='newspaper' size={32} color='orange'></FontAwesome5>
      }}}></TabFav.Screen>
      <TabFav.Screen name='Vue' component={StackSerieVue} options={{tabBarIcon:()=>{
        return <FontAwesome5 name='check-circle' size={32} color='green'></FontAwesome5>
      }}}></TabFav.Screen>


       <TabFav.Screen name='Compte' component={StackMyCompte} options={{tabBarIcon:()=>{
        return <FontAwesome5 size={32} name='user' brand></FontAwesome5>
      }}}></TabFav.Screen>
      <TabFav.Screen name='Déconnexion' component={Déconnexion} options={{tabBarIcon:()=>{
        return <FontAwesome5 size={32} name='user' brand></FontAwesome5>
      }}}></TabFav.Screen>



     </TabFav.Navigator>)
 }
 else
 {
 return <TabNonConnecte.Navigator>
     <TabNonConnecte.Screen name='Connexion' component={StackMyConnexion} options={{tabBarIcon:()=>{
        return <FontAwesome5 size={32} name='sign-in-alt' brand></FontAwesome5>
      }}}></TabNonConnecte.Screen>
       <TabNonConnecte.Screen name='Inscription' component={StackMyInscription} options={{tabBarIcon:()=>{
        return <FontAwesome5 size={32} name='user' brand></FontAwesome5>
      }}}></TabNonConnecte.Screen>
      </TabNonConnecte.Navigator>
 }
  
}
    return (
        <NavigationContainer>
        <MyDrawer></MyDrawer>
        </NavigationContainer>
    )
}
const style=StyleSheet.create({
  icon:{
    width:20,
    height:20
  }
})

export default Navigation

   
