import {createStore}from 'redux'
import toggleFavorite from './Reducer/Favoris'
import ProfilImage from './Reducer/ProfilImage'
import AfficherSerieVue from './Reducer/Vue'
import {persistCombineReducers} from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage:AsyncStorage,

}


export default createStore(persistCombineReducers(persistConfig,{toggleFavorite,ProfilImage,AfficherSerieVue}))
