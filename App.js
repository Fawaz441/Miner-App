import { Poppins_400Regular, useFonts } from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';
import React,{useEffect} from 'react';
import TabNavigator from './navigator/TabNavigator';
import { Provider, useSelector } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import reducer from './store/reducer'



const store = createStore(reducer, compose(applyMiddleware(thunk)))

export default function App() {

  let [fontsLoaded] = useFonts({ Poppins_400Regular, })

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Provider store={store}>
      <TabNavigator />
    </Provider>
  );
}

