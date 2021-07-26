import { MINING_FORCE, BALANCE, newUserMiningForce,newUserBalance, ERRORS, USER_INFO } from "./constants"
import { checkItem, getItem, storeItem } from "./storage"
import * as actionTypes from './actionTypes'
import { Alert } from "react-native"
import axios from "../api/axios"
import { showMessage } from "react-native-flash-message"

export const setBalance = amount => {
    return {
        type: actionTypes.SET_BALANCE,
        balance: amount
    }
}


// on app load
export const loadMiningForce = () => {
    return dispatch => {
        getItem(MINING_FORCE)
            .then(res => {
                dispatch({
                    type: 'SET_MINING_FORCE',
                    miningForce: checkItem(res) ? res : newUserMiningForce
                })
            })
            .catch(err => {
                console.log('Errors getting mining Force')
                dispatch({
                    type: 'SET_MINING_FORCE',
                    miningForce: newUserMiningForce
                })
            })
    }
}

export const loadBalance = () => {
    return dispatch => {
        getItem(BALANCE)
            .then(res => {
                dispatch({
                    type: 'SET_BALANCE',
                    balance: checkItem(res) ? res : newUserBalance
                })
            })
            .catch(err => {
                console.log('Errors getting BALANCE')
                dispatch({
                    type: 'SET_BALANCE',
                    balance: newUserBalance
                })
            })
    }
}

// end app load process

// after purchase
export const setMiningForce = force => {
    return dispatch => {
        storeItem(MINING_FORCE, force)
            .then(res => {
                dispatch({
                    type: actionTypes.SET_MINING_FORCE,
                    miningForce: force
                })
                Alert.alert('Success', `Your mining force is now ${force}mBTC/s`)
            })
    }
}

export const carryOutPurchase = price => {
    return {
        type: actionTypes.CARRY_OUT_PURCHASE,
        price: price
    }
}

// auth
export const signup = payload => async (dispatch) =>{
    dispatch({type:actionTypes.IS_SIGNING_UP})
    axios.post('/signup/',payload)
    .then(res => {
        if(res.data.user_info){
            dispatch({
                type:'IS_AUTHENTICATED',
            })
            dispatch(setUserInfo(res.data.user_info))
        }
        if(res.data.errors){
            dispatch({
                type:ERRORS,
                error:JSON.stringify(res.data.errors)
            })
        }
    })
    .catch(err => {
        dispatch({
            type:ERRORS,
            error:'Errors signing up'
        })
    })
}

export const login = payload => async (dispatch) =>{
    dispatch({type:actionTypes.IS_LOGGING_IN})
    const {username,password} = payload
    axios.get(`/login?username=${username}&password=${password}`)
    .then(res => {
        if(res.data.error){
            showMessage({ message:'Error', description:'Error Logging in', type:'danger' })
            dispatch({
                type:ERRORS,
                error:'Errors'
        })}
        else{
            dispatch({
                type:'IS_AUTHENTICATED',
            })
            dispatch(setUserInfo(res.data))
        }
    })
    .catch(err => {
        console.log(err.response)
        showMessage({ message:'Error', description:'Error Logging in', type:'danger' })
        dispatch({
            type:ERRORS,
            error:'Errors Logging in'
        })
    })
}


export const setUserInfo = info => async (dispatch) => {
    dispatch({
        type:actionTypes.SET_USER_INFO,
        info:info
    })
    storeItem(USER_INFO,info)
    storeItem(MINING_FORCE, info.speed)
}


export const addPayment = amount => {
    return {
        type:'ADD_PAYMENT',
        amount:amount
    }
}