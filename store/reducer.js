import * as actionTypes from './actionTypes'
import { ERRORS } from './constants'

const initialState = {
    NavOpen: false,
    balance: 0.000001,
    referralCode: '',
    isNewUser: true,
    miningForce: 0.00005,
    signingUp: false,
    authenticated: false,
    errors: '',
    user_info: {}
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'OPEN':
            return { ...state, NavOpen: true }
        case "CLOSE":
            return { ...state, NavOpen: false }
        case "SET_BALANCE":
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
                authenticated: true
            }
        case ERRORS:
            return { ...state, signingUp: false, errors: action.error }
        case actionTypes.SET_REFERRER:
            return { ...state, referrer: referrer }
        case actionTypes.SET_USER_INFO:
            return {
                ...state,
                user_info: action.info,
                authenticated: true
            }
        default:
            return state
    }


}
export default reducer