import React, { Component } from 'react'
import { 
    Form, 
    Icon, 
    Input, 
    Button, 
    Checkbox,
    Card,
    Spin
} from 'antd'
import './login.less'
import {connect} from 'react-redux'
import {login} from '../../actions/user'
import {Redirect} from 'react-router-dom'
const wrapperCol = {

}

const mapState = state => ({
    isLogin: state.user.isLogin,
    isLoading:state.user.isLoading
})

@connect(mapState, {login})
@Form.create()
class Login extends Component {
      handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            // console.log('Received values of form: ', values);
            this.props.login(values)
          }
        });
      };
    
      render() {
        const { getFieldDecorator } = this.props.form;
        return (
        this.props.isLogin
        ?
        <Redirect to='/admin' />
        :
        <Card
            title='EC Admin Login'
            className='ec-login-wrapper'
        >
          {/* <Spin spinning={this.props.isLoading}> */}
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item 
                wrapperCol={wrapperCol}
            >
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input
                  disabled={this.props.isLoading}
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Username"
                />,
              )}
            </Form.Item>
            <Form.Item
                wrapperCol= {wrapperCol}
            >
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input
                  disabled={this.props.isLoading}
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                />,
              )}
            </Form.Item>
            <Form.Item
                wrapperCol={wrapperCol}
            >
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox disabled={this.props.isLoading} >Remember me</Checkbox>)}
              
              <Button loading={this.props.isLoading} type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
            </Form.Item>
          </Form>
          {/* </Spin> */}
        </Card>
        );
      }
    }

export default Login