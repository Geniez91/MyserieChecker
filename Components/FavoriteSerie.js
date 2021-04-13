import React, { Component } from 'react'
import { View,Share,TouchableOpacity,Image,StyleSheet,ScrollView } from 'react-native'
import SerieList from '../Components/SerieList'
import {connect}from 'react-redux'
import Avatar from './Avatar'



export class FavoriteSerie extends Component {
    render() {
        console.log(this.props.favoritesFilm)
    
        return (
            <View style={style.main_container}>
            <View style={{alignItems:'center'}}>
            <Avatar></Avatar>
            </View>
               <SerieList
               series={this.props.favoritesFilm}
               favoriteList={true}
               navigation={this.props.navigation}
                           ></SerieList>
                           
                           <TouchableOpacity style={style.Share} onPress={()=>this.BoutonShare()}>
                               <Image
                               source={require('../Images/boutonshare.png')}
                               style={style.ImageFloating}
                               ></Image>
                           </TouchableOpacity>
            </View>
        )
    }
    BoutonShare=()=>{
        var index=0
        Share.share({
            message:'Ma liste de mes series Favorites :'+this.props.favoritesFilm.map(series=>{
                
                return series.name
            })
        })
    }
}
const mapStateToProps=state=>{
    return{
        favoritesFilm:state.toggleFavorite.favoritesFilm
    }
}
const style=StyleSheet.create({
    ImageFloating:{
        width:70,
        height:70
    },
    Share:{
        alignItems:'center'
    },
    main_container:{
        flex:1
    }
})

export default connect(mapStateToProps)(FavoriteSerie)
