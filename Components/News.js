import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import {View,Text,ActivityIndicator,StyleSheet} from 'react-native'
import {getNewsSeries} from '../API/TMDB'
import { SerieList } from './SerieList'

 class News extends Component {
     constructor(props) {
         super(props)
     
         this.state = {
              loading:false,
              series:[]
         }
         this.page='0'
         this.totalpages='0'
         this.ChargerSerie=this.ChargerSerie.bind(this)
     }
     ChargerSerie=()=>{
         this.setState({
             loading:true
         })
         getNewsSeries(this.page+1).then(data=>{
             this.page=data.page
             this.totalpages=data.total_pages
             this.setState({
                 loading:false,
                 series:[...this.state.series,...data.results]
             })
         })
     }
    
     ChargementSerie(){
 
    if(this.state.loading===true){
return (
      <View style={style.loading}>
      <ActivityIndicator size='large' color="#0000ff"/>
      </View>)
    }
}
FormListSerie()
{
    if(this.state.loading===false)
    {
 return (
          <View>
              <SerieList
              series={this.state.series}
              navigation={this.props.navigation}
              ChargerSerie={this.ChargerSerie}
              page={this.page}
              totalpage={this.totalpages}
              favoriteList={false}
              ></SerieList>
          </View>
        )
    }
}
componentDidMount() {
    this.ChargerSerie()
}

     
     
    render() {
       
        return ( 
            <View>
            { this.ChargementSerie()}
           {this.FormListSerie()}
           </View>)
    }
}
const style=StyleSheet.create({
      loading:{
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
}
})

export default News
