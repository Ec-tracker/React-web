import React, { Component } from 'react'
import {
    Avatar,
    Card,
    Button,
    List,
    Badge,
    Spin
} from 'antd'
import {connect} from 'react-redux'

import {markNotificationAsReadById, markAllNotificationAsRead} from '../../actions/notification'
class Notifications extends Component {
    render() {
        return (
            <Spin spinning={this.props.isLoading}>
                <Card 
                    title="Article List" 
                    bordered={false} 
                    extra={<Button disabled={this.props.list.every(item => item.hasRead === true)}
                                    onClick={this.props.markAllNotificationAsRead}
                            >
                            Mark all as read
                            </Button>}
                >
                    <List
                        itemLayout="horizontal"
                        dataSource={this.props.list}
                        renderItem={item => (
                        <List.Item 
                            extra={
                                item.hasRead
                                ?
                                null
                                : 
                                <Button onClick={this.props.markNotificationAsReadById.bind(this,item.id)}>Marked as read</Button>}
                        >
                            <List.Item.Meta
                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                            title={<Badge dot={!item.hasRead}>{item.title}</Badge>}
                            description={item.desc}
                            />
                        </List.Item>
                        )}
                    />
                </Card>
            </Spin>
        )
    }
}
const mapState = state => {
    const {
        list = [],
        isLoading
    } = state.notifications
    return {
        list,
        isLoading
    }
}

export default connect(mapState, {markNotificationAsReadById, markAllNotificationAsRead})(Notifications)