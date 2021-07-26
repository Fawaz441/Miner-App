import React, { useRef, useState, useEffect } from 'react'
import { AppState } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { loadBalance } from '../store/actions'
import TabNavigator from './AuthTabNavigator'
import UnAuthNavigator from './UnAuthNavigator'


const Navigator = () => {
    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);
    const authenticated = useSelector(state => state.authenticated)
    const dispatch = useDispatch()

    useEffect(() => {
        AppState.addEventListener("change", _handleAppStateChange);

        return () => {
            AppState.removeEventListener("change", _handleAppStateChange);
        };
    }, []);

    const _handleAppStateChange = (nextAppState) => {
        if (
            appState.current.match(/inactive|background/) &&
            nextAppState === "active"
        ) {
            dispatch(loadBalance())
        }

        appState.current = nextAppState;
        setAppStateVisible(appState.current);
    }



    if (authenticated) {
        return <TabNavigator />
    }
    else {
        return <UnAuthNavigator />
    }
}


export default Navigator