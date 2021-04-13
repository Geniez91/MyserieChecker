import React, { Component } from 'react'
import {View,Text,ActivityIndicator,Image,StyleSheet} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import {getCastingSerie,getImageFromApi} from '../API/TMDB'
import FadeIn from '../Animation/fadeIn'
import FadeOut from '../Animation/fadeOut'

export class Casting extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             casting:null,
             loading:true
        }
    }
    
    componentDidMount() {
       
getCastingSerie(this.props.route.params.series.id).then(data=>{
this.setState({
    casting:data,
    loading:false
})
   })   
  
    }
    
    render() {
    
        return (
          
            <View>
               {this.AfficherChargement()}
               {this.AfficherDetail()}
            </View>
            
        )
    }
    AfficherChargement(){
        if(this.state.loading===true){
            return  <ActivityIndicator size="large" color="#0000ff" />
        }
    }
    AfficherDetail(){
        if(this.state.loading===false){
            const episode=this.state.casting
       return(<ScrollView
       style={style.scrollview}>
       <FadeOut>
      
          { episode.cast.map((cast,index)=>{
               
                return(<View style={style.cadreImage} key={index}>
                    <Image source={{uri:getImageFromApi(cast.profile_path)}} style={style.ImageCasting}></Image>
                    <View style={style.TextActeur}>
                    <Text style={style.acteurname}>{cast.name}</Text>
                    <View style={style.role}>
                        <Text>{cast.roles.map(role=>{
                            return role.character+' / '
                        })}</Text>
                    </View>
                    <View style={style.castepisode}>
                        <Text style={style.textcasttotal}>{cast.total_episode_count+' épisodes'}</Text>
                    </View>
                    </View>
                </View>)
            })}
           </FadeOut>
            </ScrollView>)
        
           
    
    }
}
}
const style=StyleSheet.create({
    ImageCasting:{
        width:130,
        height:130
    },
scrollview:{
    marginLeft:3,
    borderColor:'black',
    borderWidth:1,
    borderRadius:5,
    marginRight:3
   
  
    
},
cadreImage:{
marginTop:2,
marginLeft:4,
marginRight:3,
 flexDirection:'row'

},
TextActeur:{
    marginLeft:3,
    flexDirection:'column'
},
acteurname:{
    fontWeight:'bold'
},
role:{
    flexWrap:'wrap'
},
castepisode:{
    marginTop:1
},
textcasttotal:{
    fontStyle:'italic'
}
})

export default Casting
