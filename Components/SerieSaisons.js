import React, { Component } from 'react'
import {View,Text,StyleSheet,ScrollView,Image}from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {getImageFromApi} from '../API/TMDB'
import FadeIn from '../Animation/fadeIn'

export class SerieSaisons extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             series:this.props.route.params.series
        }
     
    }
    
    render() {
        const series=this.state.series
       
        return (

            <ScrollView style={styles.main_container}>
            <FadeIn>
          <View style={styles.vueSaison} >
              <Text style={styles.TextSaisons}>Les Saisons de {series.name}</Text>
          </View>
          
          {series.seasons.map((saison,index)=>{
              console.log(series)
              console.log(saison.id)
              
              this.idSais=this.idSais+1
              return (
                  <TouchableOpacity onPress={()=>this.CliquerSaison(saison.id,saison.season_number)} key={index}>
              <View style={styles.vue}>
              <Image 
              source={{uri:getImageFromApi(saison.poster_path)}}
              style={styles.posterSaison}
              >

              </Image>
              <View style={styles.test}>
             
              <Text style={styles.saisonname}>{saison.name}</Text>
              </View>
              </View>
              </TouchableOpacity>)
          })}
          </FadeIn>
          </ScrollView>
        )
    }   CliquerSaison(idSaison,season_number){
        this.props.navigation.navigate('Details de la Saison',{idSerie:this.state.series.id,idSaison:idSaison,NumeroSaison:season_number})
    }
}
const styles=StyleSheet.create({
    main_container:{
        flex:1
    },
    vueSaison:{
        alignItems:'center',
        marginTop:4,
        
    },
    TextSaisons:{
        fontWeight:'bold',
        fontSize:28
    },
    posterSaison:{
        flex:1,
        width:350,
        height:350,
        borderRadius:5
    },
    vue:{
        marginTop:7,
        marginLeft:2,
        alignItems:'center',
        marginBottom:2
    },
    saisonname:{
        fontSize:20,
        fontWeight:'bold'
    }
    
})

export default SerieSaisons
