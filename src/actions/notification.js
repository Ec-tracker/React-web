import actionTypes from './actionTypes'
import  {getNotifications} from '../requests'
const startPost = () => {
    return {
        type:actionTypes.START_NOTIFICAION_FETCH
    }
}

const finishPost = () => {
    return {
        type:actionTypes.FINISH_NOTIFICAION_FETCH
    }
}
export const markNotificationAsReadById = (id) => {
    return dispatch => {
        dispatch(startPost())
        setTimeout(()=>{
            dispatch({
                type:actionTypes.MARK_NOTIFICATION_AS_READ_BY_ID,
                payload: {
                    id
                }
            })
            dispatch(finishPost())
        }, 2000)
    }
}


export const markAllNotificationAsRead = () => {
    return dispatch => {
        dispatch(startPost())
        setTimeout(()=>{
            dispatch({
                type:actionTypes.MARK_ALL_NOTIFICATION_AS_READ,
            })
            dispatch(finishPost())
        }, 2000)
    }
}

export const getNotificationList = () => {
    return dispatch => {
        dispatch(startPost())
        getNotifications()
            .then(resp => {
                dispatch({
                    type:actionTypes.RECEIVE_NOTIFICATIONS,
                    payload: {
                        list:resp.data.list
                    }
                })
                dispatch(finishPost())
            })

    }
}
