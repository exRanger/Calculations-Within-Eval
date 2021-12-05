
import { ENABLE_LOGIN_BUTTON } from "../types/loginType"

const initialState = {
    isDisabled: true
}


export const loginReducer = (state = initialState, action) => {
    switch(action.type){
        case ENABLE_LOGIN_BUTTON: return { ...state, isDisabled: action.payload}
        default: return state
    }
}