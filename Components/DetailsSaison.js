import React, { Component } from 'react'
import {View,Text,ActivityIndicator,StyleSheet,Image,TouchableOpacity} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { getDetailFromSaison, getImageFromApi } from '../API/TMDB'
import moment from 'moment'
import FadeIn from '../Animation/fadeIn'

export class DetailsSaison extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             saison:null,
             loading:true
             
        }
      
    }
    componentDidMount() {
        const {idSerie,idSaison,NumeroSaison}=this.props.route.params
        console.log(idSerie,idSaison,NumeroSaison)
        getDetailFromSaison(idSerie,NumeroSaison).then(data=>{
          this.setState({
              saison:data,
              loading:false
          })
        })
       console.log(this.state.saison)
        
    }
    
    
    render() {
       
           return (
            <ScrollView style={style.main_container}>
                 {this.AfficherChargement()}
                 {this.AfficherListeEpisode()}
            </ScrollView>)
        
    }
    AfficherChargement(){
        if(this.state.loading){

return (<View>
        <ActivityIndicator size="large" color="#0000ff"></ActivityIndicator>

</View>)
    }
}

AfficherListeEpisode(){

    if(this.state.loading===false){
        console.log(this.state.saison.episodes)
      return( 
      <FadeIn>
      <View>
            {this.state.saison.episodes.map((episode,index)=>{
               
               return (
               <TouchableOpacity key={index} style={style.VueEpisode} onPress={()=>this.DetailsEpisode(episode.episode_number,this.state.saison.poster_path)}>
               <View style={style.test}>
                <Image 
                source={{uri:getImageFromApi(this.state.saison.poster_path)}}
                style={style.ImageVue} ></Image>
                <View style={style.VueText}>
               <Text style={style.nbEpisode}>Episode {episode.episode_number} : {episode.name}</Text>
               <Text numberOfLines={7} style={style.overview}>{episode.overview}</Text>
               <Text style={style.date}>Sortie le {moment(episode.air_date).local('fr').format('Do MMMM YYYY')}</Text>
              
                </View>
               </View>
               
               </TouchableOpacity>)
            })}


        </View>
        </FadeIn>)
    }
}
DetailsEpisode=(idEpisode,poster_path)=>{
      const {idSerie,idSaison,NumeroSaison}=this.props.route.params
    this.props.navigation.navigate('Details de l episode',{idSeries:idSerie,idSaison:NumeroSaison,idEpisode:idEpisode,poster_path:poster_path})
}
}
const style=StyleSheet.create({
VueEpisode:{
    marginBottom:2,
    
},
ImageVue:{
    height:180,
    width:120,
},
nbEpisode:{
    marginLeft:3,
    marginBottom:5,
    fontSize:20,
    fontWeight:'bold'
},
test:{
    flexDirection:'row',
    
},
VueText:{
    flexDirection:'column',
    marginLeft:2,
    marginRight:8
},
overview:{
  flexWrap:'wrap',
    flex:1,
},
main_container:{
    flex:1,
    marginTop:4,
    marginRight:7,
    
},
date:{
    fontStyle:'italic',
    fontSize:15
}
})

export default DetailsSaison
