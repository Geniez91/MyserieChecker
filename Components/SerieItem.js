import React, { Component } from 'react'
import { View,TouchableOpacity,Text,Image,StyleSheet } from 'react-native'
import {getImageFromApi} from '../API/TMDB'
import moment from 'moment'
import 'moment/locale/fr';
import {connect}from 'react-redux'
import FadeIn from '../Animation/fadeIn';



export class SerieItem extends Component {

    AfficherImageFavoris=()=>{
        const {series}=this.props
        if(this.props.favoritesFilm.findIndex(item=>item.id===series.id)!==-1)
        {
        
        return <Image
        source={require('../Images/favorite.png')}
        style={styles.imageFavoris}
        ></Image>
        }
        
        

    }
    
    
    render() {
       
        
       const{series,AfficherDetailSerie}=this.props
       console.log(this.props.route)
        return (
            <FadeIn>
         <TouchableOpacity style={styles.main_container} onPress={()=>AfficherDetailSerie(series.id)} >  
            <Image
            source={{uri:getImageFromApi(series.poster_path)}}
            style={styles.image}
            >
            
            </Image>
            <View style={styles.Content}>
                <View style={styles.header}>
                {this.AfficherImageFavoris()}
                    <Text style={styles.text_film}>{series.name}</Text>
                    <Text style={styles.vote}>{series.vote_average}</Text>

                </View>
                
                <View style={styles.description}>
                    <Text numberOfLines={6}>{series.overview}</Text>
                </View>
                <View style={styles.date_container}>
              
                    <Text>
                     
                    
                    {'Sortie le '+moment(series.first_air_date).locale('fr').format('Do MMMM YYYY')}</Text>
                </View>
            </View>
         </TouchableOpacity>
         </FadeIn>
        )
    }
}
const styles=StyleSheet.create({
    image:{
        width:120,
        height:180
    },
    main_container:{
flexDirection:'row',
marginLeft:3,
marginBottom:3,
marginLeft:3,
marginRight:4,
paddingLeft:2,
marginTop:3

    },
    Content:{
        flex:1,
        marginLeft:3
    },
    header:{
        flex:3,
        flexDirection:'row'
    },
    description:{
        flex:7
    },
    text_film:{
        flex:1,
        flexWrap:'wrap',
        textAlign:'center',
        fontSize:18
    },
    date_container:{
       flex:3,
        alignItems:'center'
    },
    vote:{
        fontWeight:'bold',
        fontSize:25
    },
    imageFavoris:{
        width:50,
        height:50

    }

})
const mapStateToProps=(state)=>{
return{
   favoritesFilm:state.toggleFavorite.favoritesFilm
}
}

export default connect(mapStateToProps)(SerieItem)
