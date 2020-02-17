import actionTypes from '../actions/actionTypes'

const initState = {
    isLoading:false,
    list:[{
        id:1,
        title: 'title1',
        desc: 'T1 description',
        hasRead: false,
    },{
        id:2,
        title: 'title2',
        desc: 'T2 description',
        hasRead: false
    },{
        id:3,
        title: 'title3',
        desc: 'T3 description',
        hasRead: true
    },
    ]
}

export default (state=initState, action ) => {
    switch(action.type)
    {
        case actionTypes.START_NOTIFICAION_FETCH:
            return {
                ...state,
                isLoading: true
            }
            break
        case actionTypes.FINISH_NOTIFICAION_FETCH:
            return {
                ...state,
                isLoading: false
            }
            break
        case actionTypes.MARK_NOTIFICATION_AS_READ_BY_ID:
            const newList = state.list.map(item => {
                if (item.id === action.payload.id)
                {
                    item.hasRead = true
                }

                return item
            })
            return {
                ...state,
                list: newList
            }
            break
        case actionTypes.MARK_ALL_NOTIFICATION_AS_READ:
            return {
                ...state,
                list: state.list.map(item => {
                    item.hasRead = true
                    return item
                })
            }
            break
        case actionTypes.RECEIVE_NOTIFICATIONS: 
            return {
                ...state,
                list: action.payload.list
            }
        default:
            return state
    }
}
