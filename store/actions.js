import { MINING_FORCE, BALANCE, newUserMiningForce,newUserBalance } from "./constants"
import { checkItem, getItem, storeItem } from "./storage"
import * as actionTypes from './actionTypes'
import { Alert } from "react-native"

export const setBalance = amount => {
    console.log('ajaj', amount)
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
            })
        Alert.alert('Success', `Your mining force is now ${force}mBTC/s`)
    }
}

export const carryOutPurchase = price => {
    return {
        type: actionTypes.CARRY_OUT_PURCHASE,
        price: price
    }
}