import React, { Component } from 'react'
import { Pressable } from 'react-native'
import { FlatList } from 'react-native'
import {View,Text,ActivityIndicator,StyleSheet,Image,Button,Modal} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import {Avatar} from 'react-native-elements'

import {getDetailFromEpisode, getImageFromApi} from '../API/TMDB'
import FadeIn from '../Animation/fadeIn'

export class DetailsEpisode extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             episode:null,
             loading:true,
             modalvisible:false
        }
    }
    
    componentDidMount() {
        console.log(this.props)
        const {idSeries,idSaison,idEpisode}=this.props.route.params
        getDetailFromEpisode(idSeries,idSaison,idEpisode).then(data=>{
            this.setState({
                loading:false,
                episode:data
            })
        })
    }
    AfficherChargement(){
        if(this.state.loading===true)
        {
 return <ActivityIndicator size={'large'} color={'#0000ff'}></ActivityIndicator>
        }
       
    }
    AfficherDetailEpisode(){
       if(this.state.loading==false)
       {
        const episode=this.state.episode
       console.log(this.props.route.params)
       console.log(this.state.episode)
        return(
            <FadeIn>
            <View>
            <View style={style.VueTitle}>
  
                <Text style={style.title}>{'Episode ' +episode.episode_number+ ': '+episode.name}</Text>
                <View style={style.VueNote}>
                     <Avatar
                         rounded
                        title={episode.vote_average}
                        containerStyle={{backgroundColor:'green'}}
                        size='small'
                    />
                </View>
               
                </View>
                
                <Image source={{uri:getImageFromApi(this.props.route.params.poster_path)}} style={style.poster}></Image>
                <Button title='Casting' onPress={()=>this.BoutonCasting()}></Button>
                <View>
                <Modal
                animationType={'slide'}
                transparent={true}
                visible={this.state.modalvisible}
                
                >
                    <ScrollView contentContainerStyle={style.container_vue}>
                        <View style={style.VueModal}>
                        <Pressable onPress={()=>this.setState({modalvisible:false})} style={[style.button,style.buttonOpen]} title={'Fermer'}></Pressable>
                            <Text style={[style.title,style.bordertitle]}>La Production</Text>
                           <View style={style.container_casting}>
                           {/*}
                            {episode.crew.map(crew=>{
                                return (
                                <View style={style.rowModal}>
                                <Text>{crew.name}</Text>
                                <Text>{crew.job}</Text>
                               {crew.profile_path!==null ?(
                                <Image source={{uri:getImageFromApi(crew.profile_path)}} style={style.ImageModal}></Image>
                               ):(<Image source={require('../Images/imageinconnu.jpg')} style={style.ImageModal}></Image>) }
                               </View>)
                               
                               
                               
                            })}
                            */}
                               <FlatList
                            horizontal
                            data={episode.crew}
                            renderItem={({item})=><ListItem item={item}></ListItem>}
                            showsHorizontalScrollIndicator={true}
                            style={style.FlatList}
                            ></FlatList>
                            </View>
                            <View style={style.VueGuest}>
                            <Text style={[style.title,style.bordertitle]}>Les Guests Stars de l'épisode</Text>
                            </View>
                            <View style={style.container_casting}>
                            <FlatList
                            horizontal
                            data={episode.guest_stars}
                            renderItem={({item})=><ListGuest item={item}></ListGuest>}
                            showsHorizontalScrollIndicator={true}
                            style={style.FlatList}
                            >

                            </FlatList>
                            </View>
                        </View>
                    </ScrollView>


                </Modal>
                </View>
                <View style={style.overview}>
                    <Text style={style.textoverview}>{episode.overview}</Text>
                </View>
            </View>
            </FadeIn>
        )
       }
    }
   
    
    
    render() {
        return (
            <View>
               {this.AfficherChargement()}
               {this.AfficherDetailEpisode()}
            </View>
        )
    }
    BoutonCasting=()=>{
  this.setState({
      modalvisible:true
  })
    
    }
}
const ListItem=({item})=>{
        console.log(item)
        if(item.profile_path!==null)
        {
          return(
          <View style={style.VueInFlastList}>
                 <Image source={{uri:getImageFromApi(item.profile_path)}} style={style.ImageModal}></Image>
                <Text>{item.name}</Text>
                <Text style={style.job}>{item.job}</Text>

          </View>  )
        }
        else
        {
return(<View style={style.VueInFlastList}>
                 <Image source={require('../Images/imageinconnu.jpg')} style={style.ImageModal}></Image>
                <Text>{item.name}</Text>
                <Text style={style.job}>{item.job}</Text>
          </View>) 
        }
    }
        const ListGuest=({item})=>{
            return(
                <View style={style.VueInFlastListGuest}>
                <Image
                source={{uri:getImageFromApi(item.profile_path)}}
                style={style.ImageModal}
                ></Image>
                <Text>{item.name}</Text>
                <Text style={style.job}>{item.character}</Text>
                </View>)
        }



    
   


    

const style=StyleSheet.create({
    VueTitle:{
     
        marginBottom:5,
        flexDirection:'row',
        justifyContent:'center'
    },
    title:{
        fontSize:20,
    },
    poster:{
        width:400,
        height:180
    },
    overview:{
        marginTop:4,
        marginLeft:4,
        marginRight:4
    },
    textoverview:{
        fontStyle:'italic',
    },
    VueModal:{
            backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
 alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2

    },
    width:500,
    height:825
},
    button:{
          borderRadius: 20,
    padding: 10,
    elevation: 2
    } ,
    buttonOpen:{
         backgroundColor: "#F194FF",
    },
    container_vue:{
         flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
    },
    bordertitle:{
     borderBottomColor:'black',
     borderBottomWidth:3
    },
    ImageModal:{
        width:120,
        height:120
    },
    container_casting:{
       flexDirection:'row',
       flexWrap:'wrap',
       marginLeft:20,
       marginRight:15,
       marginTop:10
    },
    rowModal:{
        marginRight:60,
    marginBottom:3,    },
    FlatList:{
        marginLeft:1,
        marginRight:7,
        borderTopColor:'black',
        borderTopWidth:2,
        borderBottomColor:'black',
        borderBottomWidth:2,
        borderTopStartRadius:10,
        borderBottomStartRadius:10,
       
    
    },
    VueInFlastList:{
        borderRightWidth:2,
        borderRightColor:'black',
        marginLeft:3,
    },
    job:{
        fontSize:18,
        fontStyle:'italic'
    },
    VueGuest:{
        marginTop:6
    },
    FlatListGuest:{
        marginTop:8,
        marginLeft:19,
          borderTopColor:'black',
        borderTopWidth:2,
         borderBottomColor:'black',
        borderBottomWidth:2,
          borderTopStartRadius:10,
        borderBottomStartRadius:10,
        
        

    },
    VueInFlastListGuest:{
borderRightWidth:2,
        borderRightColor:'black',
        marginLeft:3,
    },
    VueNote:{
textAlign:'right',
marginLeft:25
    },
  
   
  
    


})

export default DetailsEpisode
