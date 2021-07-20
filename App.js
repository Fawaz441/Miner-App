import { Poppins_400Regular, useFonts } from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';
import React from 'react';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import reducer from './store/reducer'
import Navigator from './Navigator';
import FlashMessage from "react-native-flash-message";
import { Provider } from 'react-redux';




const store = createStore(reducer, compose(applyMiddleware(thunk)))

export default function App() {

  let [fontsLoaded] = useFonts({ Poppins_400Regular, })

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Provider store={store}>
      <Navigator />
      <FlashMessage position="top"/>
    </Provider>
  );
}

