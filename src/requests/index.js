import axios from 'axios'
import { 
    Message 
} from 'antd'
const isDev = process.env.NODE_ENV === 'development'

const service = axios.create({
    baseURL: isDev ? 'http://rap2api.taobao.org/app/mock/240874' : ''
})

service.interceptors.request.use((config) => {
    config.data = Object.assign({},config.data,{
        // authToken: window.localStorage.getItem('authoToken'),
        authToken:'sdfsdfas'
    })
    return config
})


service.interceptors.response.use((resp) => {
    if (resp.data.code === 200)
        return resp.data
    else
    {   
        Message.error(resp.data.errMsg)
    }
})

// Get Article List
export const getArticles = (offset = 0, limited =10 ) =>{
    return service.post('/api/v1/articleList', {
        offset,
        limited
    })
}


// Delete article
export const deleteArticleById = (id) => {
    return service.post(`/api/v1/article/${id}`)
}

// Get Article by Id
export const getArticleById = (id) => {
    return service.post(`/api/v2/article/${id}`)
}

// Get Article by Id
export const saveArticle = (id, data) => {
    return service.post(`/api/v3/article/${id}`, data)
}


// Get Article Amount
export const getArticleViews = () => {
    return service.post(`/api/v1/articleAmount`)
}

// Get notification list
export const getNotifications = () => {
    return service.post(`/api/v1/notifications`)
}


// Login
export const loginRequest = (userInfo) => {
    return service.post(`/api/v1/login`, userInfo)
}
