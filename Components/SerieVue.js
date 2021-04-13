import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import {View,Text,Image,StyleSheet,ScrollView} from 'react-native'
import {connect} from 'react-redux'
import FadeIn from '../Animation/fadeIn'
import {getImageFromApi} from '../API/TMDB'

export class SerieVue extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             series:[],
             title:null,
             affichage:false
        }
        
    }
    componentDidMount() {
        this.setState({
            series:this.props.SerieVue,
        

        })
    }
      AfficherDate()
    {
        
if(this.state.affichage===false)
{
   this.setState({
       affichage:true
   })
}
else
{
 this.setState({
     affichage:false
 })
}
        
    }
    render() {
        console.log(this.props.SerieVue)
        return (
            <FadeIn>
         <ScrollView style={style.main_container}>
            {this.state.series.map((Seri,index)=>{
                return <View key={index}>
                <TouchableOpacity style={style.VueSerie} onLongPress={()=>this.AfficherDate()}>
                <View>
                <Image source={{uri:getImageFromApi(Seri.poster_path)}} style={style.ImageApi}></Image>
                
                </View>
                <View style={style.VueTextSerie}>
              
                  {this.state.affichage===false?(<Text style={style.Text}>{Seri.name}</Text>):(<Text style={style.Text}>{'Sortie le '+Seri.first_air_date}</Text>)}  
                   
                    </View>
                     <View style={style.BouleVote}>
                    <Text style={style.textVote}>{Seri.vote_average}</Text>
                </View>
                
                    
                    </TouchableOpacity>
                    <View style={style.NumberSaison}>
                    <Text>{Seri.number_of_seasons+ ' saisons ('+Seri.number_of_episodes+ ' episodes)'}</Text>
                </View>
                   
                </View>
            })}
         </ScrollView>
         </FadeIn>
        )
    }
}
const mapStateToProps=(state)=>{
return{
    SerieVue:state.AfficherSerieVue.SerieVue
}
}
const style=StyleSheet.create({
    ImageApi:{
        width:70,
        height:70,
        borderRadius:30
    },
    VueSerie:{
        flexDirection:'row',
        marginTop:3
    },
    main_container:{
        marginLeft:3,
        marginTop:3
    },
    VueTextSerie:{
        marginTop:15,
       marginLeft:10
    },
    Text:{
        fontStyle:'italic',
        color:'grey'
    },
    BouleVote:{
        flex:1,
justifyContent:'flex-end',
alignItems:'flex-end',
marginRight:10,
height:30,
width:30,  
       
    },
    textVote:{
        color:'green'
    },
    NumberSaison:{
            flexDirection:'column'
        }
    }
)

export default connect(mapStateToProps)(SerieVue)
