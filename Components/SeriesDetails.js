import React, { Component } from 'react'
import { Text, View,ScrollView,Image,StyleSheet,ActivityIndicator, Button,} from 'react-native'
import {getDetailFromAPI,getImageFromApi} from '../API/TMDB'
import Carousel,{Pagination} from 'react-native-snap-carousel'
import { createRef } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {connect}from 'react-redux'
import FadeIn from '../Animation/fadeIn'
import ShrinkWidth from '../Animation/ShrinkWidth'




export class SeriesDetails extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             loading:false,
             series:undefined,
            activeIndex:0,
            titleBoutton:null,
           
            
        }
        this.carrousel=createRef()
    }
    

    componentDidMount() {
       console.log(this.props)
       getDetailFromAPI(this.props.route.params.idSeries).then(data=>
        {
        this.setState({
            series:data,
            loading:false
        })
       
       })
    }
    componentDidUpdate(prevProps, prevState) {
        console.log(this.props.favoritesFilm)
    }
    
    
    render() {
      {
          return(
              
              <View style={style.main_container}>
  {this.AfficherChargement()}
         {this.AfficherDetailFilm()}
              </View>
              
          )
        }
        
    }
    AfficherFavoris(){
        const action={type:'TOGGLE_FAVORITE',value:this.state.series}
        this.props.dispatch(action)
        //permet d'envoyer l'action
    }
    AffichertTooltip(){
        console.log('test')
        this.setState({
            Tooltip:true
        })
    }
    AfficherVue(){
        const action={type:'ToggleVue',value:this.state.series}
        this.props.dispatch(action)
      
    }
    Pagination=()=>{
        const series=this.state.series
        return <Pagination
        dotsLength={series.created_by.length}
        activeDotIndex={this.state.activeIndex}
containerStyle={{backgroundColor:'#303030',marginLeft:2,
         marginRight:2,borderRadius:5,height:70}}
        dotStyle={{
            width:10,
            height:10,
            marginHorizontal:8,
            backgroundColor:'rgba(255,255,255,0.92)'
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        style={{flex:1}}
        
        >

        </Pagination>
    }
    AfficherDetailFilm()
    {
         console.log(this.state.series)

         if(this.state.series!==undefined){
 const series=this.state.series
const date=new Date(series.first_air_date)
const year=date.getUTCFullYear();
        return (
            
            <ScrollView style={style.ScrollView}>
            <FadeIn>
                
                    <Image
                    source={{uri:getImageFromApi(series.backdrop_path)}}
                    style={style.imageBackground}
                    ></Image>
                  
                    <Text style={style.TitreSerie}>{series.name+' ('+year+')'}</Text>
                   
                    <TouchableOpacity onPress={()=>this.AfficherFavoris()} style={style.TouchableFavoris}>
 {this.AfficherImageFavoris()}
        </TouchableOpacity>
      
                    
                    {this.AfficherButtonSaison()}
                   
                    {}
                      <View>
                        <Text style={style.genre}>{series.genres.map(genre=>{
                            return genre.name+'/'
                        })}</Text>
                    </View>
                 
                    <Text style={style.description}>{series.overview}</Text>
                    
                    <Text style={style.createurtext}>Le(s) Créateur(s)</Text>
                    
                    <View style={style.Createur}>
                    
                      <TouchableOpacity onPress={()=>this.goPast()} style={style.fontawesome}>
                      
                     <FontAwesome5.Button size={32} name='arrow-left' brand></FontAwesome5.Button>
                    
                    
                    </TouchableOpacity>

                           <Carousel
                    layout='stack'
                    layoutCardOffset={18}
                    ref={this.carrousel}
                    data={series.created_by}
                    renderItem={this.renderItem}
                    sliderWidth={800}
                    itemWidth={720}
                    onSnapToItem={index=>this.setState({activeIndex:index})}
                    >

                    </Carousel>
                   
                    <TouchableOpacity onPress={()=>this.goForward()} style={style.fontawesome}>
                    <FontAwesome5.Button size={32} name='arrow-right' brand></FontAwesome5.Button>
                    
                    
                    </TouchableOpacity>
                    {console.log(this.carrousel.current)}
                    </View>
                    {this.Pagination()}
                 
                  
                  <View style={style.VueBoutton}>
                {
                    this.AfficherBoutonVu()
                }
                
                </View>
            </FadeIn>
          </ScrollView>
         )
         }
      
    }
    goForward(){
        this.carrousel.current.snapToNext()
    }
    goPast(){
        this.carrousel.current.snapToPrev()
    }
    AfficherChargement(){
        if(this.state.loading)
        {
return (
<View style={style.loading}>
     <ActivityIndicator size="large" color="#0000ff"/>
</View>)
        }

    }
    renderItem=({item,index})=>{

        if(item.profile_path===null)
        {
return <View style={style.carrousel}>
     
     <Image 
    source={require('../Images/imageinconnu.jpg')}
    style={style.ImageAuteur}
    >
    </Image>
    <View style={style.vueTextCarrousel}>
            <Text style={style.textcarrousel}>{item.name}</Text>
            </View>
        </View>
        }
        else
        {
           return <View style={style.carrousel}>
     
     <Image 
    source={{uri:getImageFromApi(item.profile_path)}}
    style={style.ImageAuteur}
    >
    </Image>
    <View style={style.vueTextCarrousel}>
            <Text style={style.textcarrousel}>{item.name}</Text>
    </View>
   
        </View>
        }




    
    }
    AfficherButtonSaison(){
    return (<View style={style.ButtonSaison}>
    
    <TouchableOpacity onPress={()=>this.AfficherSaison() } style={style.saisons}>
 
      
           <FontAwesome5 name='list' solid size={32}></FontAwesome5>
      
       </TouchableOpacity>
        <TouchableOpacity style={style.Casting} onPress={()=>this.AfficherCasting()}>
            <FontAwesome5 name='user-circle' solid size={32}></FontAwesome5>
        </TouchableOpacity>
        </View>)
    }
    
    AfficherSaison(){
        this.props.navigation.navigate('Les Saisons',{series:this.state.series})
    }
    AfficherCasting(){
        this.props.navigation.navigate('Le Casting',{series:this.state.series})
    }
    AfficherBoutonVu(){
        var titrebtn='Marquer comme vu'
        const series=this.state.series
        if(this.props.SerieVue.findIndex(item=>item.id===this.state.series.id)!==-1){
            titrebtn='Marquer comme non vu'
        }
        return <Button title={titrebtn} onPress={()=>this.AfficherVue()} style={style.ButtonVu}></Button>
    }


    AfficherImageFavoris(){
        var image=require('../Images/nonfavorite.png')
        const series=this.state.series
        var shouldEnlarge=false
    
        if(this.props.favoritesFilm.findIndex(item=>item.id===this.state.series.id)!==-1)
        {
            shouldEnlarge=true
            image=require('../Images/favorite.png')
        }
        
        return (
        <ShrinkWidth shouldEnlarge={shouldEnlarge}>
        <Image
        source={image}
        style={style.ImageFavoris}
        ></Image>
        </ShrinkWidth>)
        
    }
}




const style=StyleSheet.create({
    imageBackground:{
        height:180,
        width:400,
        marginLeft:2,
        marginRight:10,
        marginTop:2,
        padding:3
    },
    TitreSerie: {
        textAlign:'center',
        marginTop:4,
        fontSize:20,
        fontWeight:'bold'
    },
    description:{
marginTop:7,
marginLeft:5,
padding:2,
fontSize:15
    },
    loading:{
        position:'absolute',

    },
    main_container:{
        flex:1
    },
    ScrollView:{
        flex:1
    },
    ImageAuteur:{
        width:200,
        height:200,
        resizeMode:'cover'
    },
    Createur: {
    
        flexDirection:'row',
         backgroundColor:'#303030',
         borderRadius:5,
         height:225,
         marginLeft:2,
         marginRight:2
         
    },
    createurtext:{
        textAlign:'center',
        marginBottom:2,
        marginTop:2,
        fontWeight:'bold'
    },
    carrousel:{
        marginTop:5,
        borderRadius:5
       
    },
    fontawesome:{
        justifyContent:'center',
        flex:1,
        
    },
    textcarrousel:{
       
        fontWeight:'bold'
    },
    vueTextCarrousel:{
        backgroundColor:'floralwhite',
        width:200,
    },
    genre:{
      textAlign:'center',
      fontStyle:'italic'
    },
    ButtonSaison:{
       justifyContent:'center',
       borderColor:'black',
       borderWidth:1,
       marginTop:3,
       marginBottom:3,
       flexDirection:'row',
    },
    ImageFavoris:{
flex:1,
width:null,
height:null


    },
    TouchableFavoris:{
       alignItems:'center',
       marginTop:5,
       marginBottom:4
    },
    Casting:{
    
    
    },
    saisons:{
       
        marginLeft:5,
         marginRight:10
    },
    ButtonVu:{
         position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    },
    VueBoutton:{
        marginLeft:3,
        marginRight:3,
        marginTop:3,
        marginBottom:3
    }
})
const mapStateToProps=(state)=>{
return{
   favoritesFilm:state.toggleFavorite.favoritesFilm,
   SerieVue:state.AfficherSerieVue.SerieVue
}
}



export default connect(mapStateToProps)(SeriesDetails)
