import * as actionTypes from './actionTypes'

const initialState = {
    NavOpen: false,
    // balance:0.000001,
    balance:0.25,
    referralCode:'',
    isNewUser:true,
    miningForce:0.00005
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'OPEN':
            return { ...state, NavOpen: true }
        case "CLOSE":
            return { ...state, NavOpen: false }
        case "SET_BALANCE":
            return {...state,balance:action.balance}
        case 'SET_MINING_FORCE':
            return {...state,miningForce:action.miningForce}
        case actionTypes.CARRY_OUT_PURCHASE:
            return {...state,balance:(state.balance - action.price).toFixed(8)}
        default:
            return state
    }


}
export default reducer