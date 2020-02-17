import React, { Component } from 'react'
import {
    Card,
    Upload,
    Spin,
} from 'antd' 
import {connect} from 'react-redux'
import {changeAvatar} from '../../actions/user'
import axios from 'axios'


const mapState = state => {
    return{
        avatarUrl: state.user.avatar
    }
}
@connect(mapState, {changeAvatar})
class Profile extends Component {
    state = {
        isUploading: false,
        avatarUrl: '',
    }
    handleUpload = ({file}) => {
        const data = new FormData()

        data.append('Token', '40fb59c9a91a19292487dffb7f3249af8a908b27:f2pZFC0_jo_x922m6z_x8f_HJQY=:eyJkZWFkbGluZSI6MTU3Nzg5ODkyOCwiYWN0aW9uIjoiZ2V0IiwidWlkIjoiNzA3MTU0IiwiYWlkIjoiMTY1NzM3MiIsImZyb20iOiJmaWxlIn0=')
        data.append('file', file)
        this.setState({
            isUploading: true
        })

        axios.post('http://up.imgapi.com', data)
            .then(resp => {
                if(resp.status === 200)
                {
                    console.log(resp)
                    this.setState({
                        isUploading:false
                    })

                    this.props.changeAvatar(resp.data.linkurl)
                }
                
            })
    }
    render() {
        return (
            <Card
                title="Profile"
                bordered={false}
            >
                <Upload
                    name='avatar'
                    className='avatar-uploader'
                    style={{
                        border: '1px dashed #dedede', 
                        width: 78, 
                        height: 78, 
                        display: 'block'
                    }}
                    showUploadList={false}
                    customRequest={this.handleUpload}
                >
                    <Spin spinning={this.state.isUploading}>
                        {
                            this.props.avatarUrl ? <img style={{width:50, height:50}}src={this.props.avatarUrl} /> : <span>Click to Upload</span>
                        }
                    </Spin>
                </Upload>
            </Card>
        )
    }
}


export default Profile