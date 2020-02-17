import actionTypes from './actionTypes'
import { loginRequest  } from '../requests'

const startLogin = () => {
    return {
        type: actionTypes.START_LOGIN
    }
}

const loginSuccess = (userInfo) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        payload: {
            userInfo
        }
    }
}

const loginFailed = () => {
    window.localStorage.removeItem('authToken')
    window.sessionStorage.removeItem('authToken')

    window.localStorage.removeItem('userInfo')
    window.sessionStorage.removeItem('userInfo')
    return {
        type: actionTypes.LOGIN_FAILED
    }
}


export const changeAvatar = (avatarUrl) => {
    console.log(avatarUrl)
    return {
        type:actionTypes.CHANGE_AVATAR,
        payload:{
            avatarUrl
        }
    }
} 
export const logOut = () => {
    return dispatch => {
        dispatch(loginFailed())
    }
}
export const login = (userInfo) => {
    return dispatch => {
        dispatch(startLogin())
        loginRequest(userInfo)
            .then(resp => {
                if (resp.code === 200) 
                { 
                    const {
                        authToken,
                        ...userInfo
                    } = resp.data
                    if(userInfo.remember === true)
                    {
                        window.localStorage.setItem('authToken', resp.data.authToken)
                        window.localStorage.setItem('userInfo', JSON.stringify(userInfo))
                    }
                    else
                    {
                        window.sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
                        window.sessionStorage.setItem('authToken', resp.data.authToken)
                    }
                    dispatch(loginSuccess(resp.data))
                }
                else
                    dispatch(loginFailed())
            })
    }
}