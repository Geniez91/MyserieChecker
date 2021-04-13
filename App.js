
import React from 'react';
import { StyleSheet} from 'react-native';

import {Provider} from 'react-redux'
import Store from './Store/ConfigureStore'
import Firebase,{firebaseContext} from './Components/Firebase/'
import Navigation from './Components/Navigation';
import {persistStore} from 'redux-persist'
import {PersistGate} from 'redux-persist/es/integration/react'



export default function App() {
 
 let persistor=persistStore(Store)
  return (
    <firebaseContext.Provider value={new Firebase()}>
   <Provider store={Store} >
    <PersistGate persistor={persistor}></PersistGate>
    <Navigation ></Navigation>

  
 </Provider>
 </firebaseContext.Provider>
  )
}

