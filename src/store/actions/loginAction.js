import { ENABLE_LOGIN_BUTTON } from "../types/loginType"

export const setIsLogin = (payload) => {
    return {
        type: ENABLE_LOGIN_BUTTON,
        payload
    }
} 