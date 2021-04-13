const initialisestate = {SerieVue: [] }

function AfficherSerieVue(state = initialisestate,action)
{
    let nextState
    switch(action.type){
        case 'ToggleVue':
            const ToggleIndex=state.SerieVue.findIndex(item=>item.id===action.value.id)
            if(ToggleIndex!==-1){//deja dans la liste on le supprime
                nextState={
                    ...state,
                    SerieVue:state.SerieVue.filter((item,index)=>index!==ToggleIndex)
                }
            }
            else
            {
                nextState={
                    ...state,
                    SerieVue:[...state.SerieVue,action.value]
                }
            }
            return nextState||state
        
        default:{
            return state
        }
    }
}
export default AfficherSerieVue