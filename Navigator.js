import React from 'react'
import { useSelector } from 'react-redux'
import TabNavigator from './navigator/TabNavigator'
import SignupScreen from './screens/SignUpScreen'

const Navigator = () => {
    const authenticated = useSelector(state => state.authenticated)
    
    if(authenticated){
        return <TabNavigator/>
    }
    else{
        return <SignupScreen/>
    }
}


export default Navigator