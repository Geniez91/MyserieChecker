import React, { Component } from 'react'
import {StyleSheet,Image,TouchableOpacity,Modal, View,Text} from 'react-native'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux'
export class Avatar extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             modal:false
        }
        this.CliqueAvatar=this.CliqueAvatar.bind(this)
    }
    CliqueAvatar=()=>{
        //Utilisation de L'API IMAGE PICKER
this.setState({
    modal:true
})



     ///   launchCamera({mediaType:'photo',saveToPhotos:true},(response)=>{
    ///        if(response.didCancel){
      //          console.log('L utilisateur a annulé')
      //      }
       //     else if(response.errorMessage){
      //          console.log('Erreur : '+response.errorMessage)
        //    }
        //    else{
           //     console.log(response.uri)
         //       let requiresource={uri : response.uri}
           //     this.setState({avatar:requiresource})
         //   }
      //  })
       // launchImageLibrary({mediaType:'photo'},(response)=>{
         //   if(response.didCancel){
           //     console.log('L utilisateur a annulé')
         //   }
         //   else if(response.errorMessage){
           //     console.log('Erreur : '+response.errorMessage)
         //   }
          //  else{
              //  console.log(response.uri)
            //    let requiresource={uri : response.uri}
              //  this.setState({avatar:requiresource})
          //  }})
    }
    GaleriePhoto=()=>{
         launchImageLibrary({mediaType:'photo'},(response)=>{
            if(response.didCancel){
               console.log('L utilisateur a annulé')
            }
           else if(response.errorMessage){
               console.log('Erreur : '+response.errorMessage)
            }
           else{
               console.log(response.uri)
               let requiresource={uri : response.uri}
                const action={type:'SetAvatar',value:requiresource}
              this.props.dispatch(action)
              this.setState({avatar:requiresource})

            }})
            this.setState({
                modal:false
            })
    }
    Photo=()=>{
           launchCamera({mediaType:'photo',saveToPhotos:true},(response)=>{
          if(response.didCancel){
              console.log('L utilisateur a annulé')
          }
           else if(response.errorMessage){
              console.log('Erreur : '+response.errorMessage)
            }
           else{
               console.log(response.uri)
              let requiresource={uri : response.uri}

              ///Création de L'action pour Afficher un Avatar
              const action={type:'SetAvatar',value:requiresource}
              this.props.dispatch(action)
               this.setState({avatar:requiresource})
            }
       })
       this.setState({
           modal:false
       })
    }
    
    
    render() {
        return (
           <TouchableOpacity
           style={style.TouchableOpacity}
           onPress={()=>this.CliqueAvatar()}
           >
           <Image
           style={style.avatar}
           source={this.props.avatar}
           ></Image>
           <Modal
            visible={this.state.modal}
            style={style.modal}
            >
            <View style={style.Center}>
            <TouchableOpacity  onPress={()=>this.GaleriePhoto()} style={style.TouchableOpacityt}>
           <FontAwesome5 name='images' size={32}></FontAwesome5>
            <Text style={style.TextChoix}> Galerie Photo
            </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.Photo()} style={style.TouchableOpacityt}>
             <FontAwesome5 name='camera-retro' size={32}></FontAwesome5>
            <Text style={style.TextChoix}> Photo
            </Text>
            </TouchableOpacity>
            </View>
            </Modal>

           </TouchableOpacity>
        )
    }
}
const style=StyleSheet.create({
TouchableOpacity:{
    margin:5,
    width:100,
      height: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#9B9B9B',
    borderWidth: 2
  },
  modal:{
       margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    justifyContent:'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  TouchableOpacityt:{
    borderColor:'black',
    borderWidth:3,
    marginTop:3,
    marginLeft:3,
    marginRight:3,
    borderRadius:10,
    flexDirection:'row',
    backgroundColor:'lightblue'
  },
  Center:{
  textAlign:'center'
  
  },
  TextChoix:{
    fontSize:18
  }
})
const MapStateToProps=(state)=>{
return{
  avatar:state.ProfilImage.avatar
}
}


export default connect(MapStateToProps)(Avatar)
