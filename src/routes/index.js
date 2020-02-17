import {
    Dashboard,
    ArticleList,
    ArticleEdit,
    Settings,
    Login,
    NotFound,
    Notification,
    NoAuth,
    Profile
} from '../views'

export const mainRouter = [{
    pathname: '/login',
    component: Login
},{
    pathname: '/404',
    component: NotFound
}]


export const adminRoutes =[{
    pathname: '/admin/dashboard',
    component: Dashboard,
    title: 'Dashboard',
    icon:'dashboard',
    isNav: true,
    roles:['001', '002', '003']
},
{
    pathname: '/admin/article',
    component: ArticleList,
    title: 'Article Management',
    icon: 'unordered-list',
    isNav: true,
    exact:true,
    roles:['001', '002']
},
{
    pathname: '/admin/settings',
    component: Settings,
    title: 'Settings',
    icon: 'setting',
    isNav: true,
    roles:['001', '002', '003']
},
{
    pathname: '/admin/notification',
    component: Notification,
    title: 'Notification',
    isNav: false,
    roles:['001', '002', '003']
},
{
    pathname: '/admin/article/edit/:id',
    component: ArticleEdit,
    title: 'Article Edit',
    isNav: false,
    roles:['001', '002']
},
{
    pathname: '/admin/noauth',
    component: NoAuth,
    title: 'No Auth',
    isNav: false,
    roles:['001', '002', '003', '004']
},
{
    pathname: '/admin/profile',
    component: Profile,
    title: 'Profile',
    isNav: false,
    roles:['001', '002', '003']
}]