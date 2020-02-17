import React, { Component } from 'react'
import logo from './logo.png'
import './frame.less'
import { 
  Layout, 
  Menu, 
  Breadcrumb, 
  Icon, 
  Dropdown,
  Avatar,
  Badge
 } from 'antd'
import  {withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import {logOut} from '../../actions/user'
import {getNotificationList} from '../../actions/notification'
const {Header, Content, Sider, Footer} = Layout

const mapState = state => {
  return {
    notificationsCount:state.notifications.list.filter(item=> item.hasRead === false).length,
    avatar: state.user.avatar,
    displayName: state.user.displayName
  }
}
@connect(mapState, {getNotificationList, logOut})
@withRouter
class Frame extends Component {
    onMenuClick = ({item, key, keyPath, domEvent}) => {
        this.props.history.push(key)
        // Must contain Router for history
    }
    onDropDownMenuClick = ({key}) => {
      // console.log(key)
      if (key === '/logout')
        this.props.logOut()
      else
        this.props.history.push(key)
    }
    componentDidMount() {
      this.props.getNotificationList()
    }
    renderDropDown =() =>{
      return (
          <Menu onClick={this.onDropDownMenuClick}>
            <Menu.Item
              key="/admin/notification"
            >
              <Badge dot={Boolean(this.props.notificationsCount)}>
                Nofitcation
              </Badge>
            </Menu.Item>
            <Menu.Item
              key="/admin/profile"
            >
                Personal Settings
            </Menu.Item>
            <Menu.Item
              key='/logout'
            >
                Log out
            </Menu.Item>
        </Menu>
      )
    }

    render() {
        return (
            <Layout className='ec-layout'>
                <Header className="header ec-header" style={{backgroundColor: '#fff'}} >
                 <div className="ec-logo" >
                    <img src={logo} alt='ec-logo'/>
                 </div>
                 <div>
                </div>
                <Dropdown overlay={this.renderDropDown()} trigger={['click']}>
                    <div style={{display:'flex', alignItems:'center'}}>
                      <Avatar src={this.props.avatar} /> 
                        <span>Welcome! {this.props.displayName}</span>
                      <Badge count={this.props.notificationsCount} offset={[-10,-10]}>
                        <Icon type="down" />
                      </Badge>
                    </div>
                </Dropdown>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <Layout style={{ padding: '24px 0', background: '#fff' }}>
                    <Sider width={200} style={{ background: '#fff' }}>
                    <Menu
                        mode="inline"
                        selectedKeys={this.props.location.pathname}
                        onClick={this.onMenuClick}
                        style={{ height: '100%' }}
                    >
                        {
                            this.props.menus.map(menu => {
                                return(
                                    <Menu.Item key={menu.pathname} >
                                        <span><Icon type={menu.icon} />{menu.title}</span>
                                    </Menu.Item>
                                )
                            })
                        }
                    </Menu>
                    </Sider>
                    <Content style={{ padding: '0 24px', minHeight: 280 }}>{this.props.children}</Content>
                </Layout>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
                    )
    }
}


export default Frame