import React, { Component } from 'react'
import { View,Text } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import SerieItem from './SerieItem'
import {connect}from 'react-redux'


export class SerieList extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             series:[]
        }
    }
    
    
    render() {
      
        

        return (
            <FlatList
            data={this.props.series}
            keyExtractor={(item)=>item.id.toString()}
            extraData={this.props.favoritefilm}
            renderItem={({item})=>(
                <SerieItem
                series={item}
                AfficherDetailSerie={this.AfficherDetailSerie}
                ></SerieItem>
            )}
            onEndReachedThreshold={0.5}
            onEndReached={()=>{
                if(!this.props.favoritefilm&&this.props.page<this.props.totalpage)
                {
                    this.props.ChargerSerie()
                }
            }}

            
            
            
            >


            </FlatList>
        )
    }
    AfficherDetailSerie=(idSerie)=>
    {
       
        this.props.navigation.navigate('Details de la Serie',{idSeries:idSerie})
    }

}
const mapStateToProps=state=>{
return {favoritefilm:state.toggleFavorite.favoritefilm}
}

export default connect(mapStateToProps)(SerieList)
