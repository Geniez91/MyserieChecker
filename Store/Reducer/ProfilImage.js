const initialisestate={avatar:require('../../Images/igface.png')}

function ProfilImage(state=initialisestate,action){
    let nexstate
    switch(action.type){
 case 'SetAvatar':{
     nexstate={
         ...state,
         avatar:action.value
     }
     return nexstate||state
 }
 default:{
     return state
 }
    }
}
export default ProfilImage