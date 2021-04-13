import React, { Component } from 'react'
import { TextInput,Button,View,StyleSheet,ActivityIndicator } from 'react-native'
import { getSerieFromApi } from '../API/TMDB'
import SerieList from './SerieList'

export class Recherche extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             loading:false,
             series:[]
        }
        this.searchText=''//on 
        this.page='0',
        this.totalpage='0'
        this.ChargerSerie=this.ChargerSerie.bind(this)
    }
    SearchInputText(text)
{
    this.searchText=text
}
    render() {
        console.log('test')
        console.log(this.state.series)
        return (
           <View style={style.main_container}>
                    <TextInput placeholder='Nom de la serie' style={style.TextInput} onSubmitEditing={()=>this.RechercheSerie()} onChangeText={(text)=>this.SearchInputText(text)}></TextInput>
                    <Button title='Recherche' onPress={()=>this.RechercheSerie()}></Button>  
                    <SerieList
                    series={this.state.series}
                    navigation={this.props.navigation}
                    ChargerSerie={this.ChargerSerie}
                    page={this.page}
                    totalpage={this.totalpage}
                    favoriteList={false}
                    ></SerieList>
                    {this.AfficherChargement()}
           </View>
        )
    }
    AfficherChargement(){
    if(this.state.loading===true){
return (
      <View style={style.loading}>
      <ActivityIndicator size='large' color="#0000ff"/>
      </View>)
    }
}
    ChargerSerie(){
        if(this.searchText.length>0)
        {
                this.setState({
                    loading:true
                })
                getSerieFromApi(this.searchText,this.page+1).then(data=>{
                    this.page=data.page
                    this.totalpage=data.total_pages
                    this.setState({
                        series:[...this.state.series,...data.results],
                        loading:false
                    })
                })
               
        }
         
    }
    RechercheSerie(){
        this.page=0
        this.totalpage=0
        this.setState({
            series:[]
        },()=>
        this.ChargerSerie()
        )}
}




const style=StyleSheet.create({
    main_container: {
        flex:1,
        marginLeft:3,
        marginRight:3
    },
    TextInput:{
       borderColor:'#0D0605',
       borderWidth:1,
       paddingLeft:2,
       marginLeft:1,
       marginBottom:2,
       marginTop:2
    },
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

export default Recherche
