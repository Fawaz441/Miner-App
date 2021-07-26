import * as actionTypes from './actionTypes'
import { ERRORS,BALANCE } from './constants'
import { storeItem } from './storage'

const initialState = {
    NavOpen: false,
    balance: 0.000001,
    referralCode: '',
    isNewUser: true,
    miningForce: 0.00000,
    signingUp: false,
    authenticated: false,
    errors: '',
    user_info: {},
    isLoggingIn:false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'OPEN':
            return { ...state, NavOpen: true }
        case "CLOSE":
            return { ...state, NavOpen: false }
        case "SET_BALANCE":
            storeItem(BALANCE, action.balance)
            return { ...state, balance: action.balance }
        case 'SET_MINING_FORCE':
            return { ...state, miningForce: action.miningForce }
        case actionTypes.CARRY_OUT_PURCHASE:
            return { ...state, balance: (state.balance - action.price).toFixed(8) }
        case 'ADD_PAYMENT':
            return { ...state, balance: (state.balance + action.amount).toFixed(8) }
        case actionTypes.IS_SIGNING_UP:
            return { ...state, signingUp: true }
        case 'IS_AUTHENTICATED':
            return {
                ...state,
                signingUp: false,
                authenticated: true,
                isLoggingIn:false
            }
        case ERRORS:
            return { ...state, signingUp: false,isLoggingIn:false, errors: action.error }
        case actionTypes.SET_REFERRER:
            return { ...state, referrer: referrer }
        case actionTypes.SET_USER_INFO:
            return {
                ...state,
                user_info: action.info,
                authenticated: true,
                balance:action.info.balance,
                miningForce:action.info.speed
            }
        case actionTypes.LOG_OUT:
            return {...state,authenticated:false,NavOpen:false}
        case actionTypes.IS_LOGGING_IN:
            return {...state,isLoggingIn:true}
        default:
            return state
    }


}
export default reducer