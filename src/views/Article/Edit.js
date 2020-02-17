import React, { Component, createRef } from 'react'
import {
    Card,
    Button,
    Form,
    Input,
    DatePicker,
    Spin
} from 'antd'

import E from 'wangeditor'
import {getArticleById,saveArticle} from '../../requests'
import moment from 'moment'
import './Editor.less'
const formItemLayout ={
    labelCol: {
        span: 6
    },
    wrapperCol:{
        span:14
    }
}
class Edit extends Component {
    constructor(){
        super()
        // this.state = {
        //     titleValidateStatus:'',
        //     titleHelp: ''
        // }
        this.state = {
            isLoading: false,
        }
        this.editorRef = createRef()
    }
    initEditor = () => {
        this.editor = new E (this.editorRef.current)
        this.editor.customConfig.onchange = (html) => {
            this.props.form.setFieldsValue({
                content: html
            })
        }
        this.editor.create()
    }
    componentDidMount(){
        this.initEditor()
        this.setState({
            isLoading:true
        })
        getArticleById(this.props.match.params.id)
            .then(resp => {
                console.log(resp)
                this.props.form.setFieldsValue({
                    title: resp.data.title,
                    author: resp.data.author,
                    amount: resp.data.amount,
                    createAt:moment(resp.createAt),
                })
                this.editor.txt.html(resp.data.content)
            })
            .finally(()=>{
                this.setState({
                    isLoading: false
                })
            })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
            const data = Object.assign({}, values, {
                createAt: values.createAt.valueOf()
            })

            this.setState({
                isLoading: true
            })

            saveArticle(this.props.match.params.id, data)
                .then(resp => {
                    console.log(resp)
                })
                .finally(()=>{
                    this.setState({
                        isLoading: false
                    })
                })
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <Card 
                title="Edit Article" 
                bordered={false} 
                extra={<Button onClick={this.props.history.goBack}>Cancel</Button>}
            >
                <Spin spinning={this.state.isLoading}>
                    <Form 
                        onSubmit={this.handleSubmit} 
                        {...formItemLayout}
                    >
                        <Form.Item
                            label='Title'
                            // validateStatus={this.state.titleValidateStatus}
                            // help={this.state.titleHelp}
                        >
                            {getFieldDecorator('title', {
                            rules: [
                                { 
                                    required: true, 
                                    message: 'Please input your title!' 
                                }, {
                                    min: 4,
                                    message: 'At least contains 4 characters'
                                }
                                // {
                                //  validator: (rule, value, callback) => {
                                //      console.log({rule, value, callback})
                                //      if (value !== '123'){
                                //          this.setState({
                                //              titleValidateStatus:'error',
                                //              titleHelp: 'title is incorrect'
                                //          })
                                //      }
                                //      else{
                                //         this.setState({
                                //             titleValidateStatus:'',
                                //             titleHelp: 'title is incorrect'
                                //         })
                                //      }
                                //      callback()
                                //  }
                                // }
                            ],
                        })(
                            <Input
                                placeholder="Title"
                            />,
                        )}
                        </Form.Item>
                        <Form.Item
                            label='Author'
                        >
                            {getFieldDecorator('author', {
                            rules: [
                                { 
                                    required: true, 
                                    message: 'Please enter author name!' 
                                }, 

                            ],
                        })(
                            <Input
                                placeholder="Author"
                            />,
                        )}
                        </Form.Item>
                        <Form.Item
                            label='Amount'
                        >
                            {getFieldDecorator('amount', {
                            rules: [
                                { 
                                    required: true, 
                                    message: 'Please enter amount!' 
                                }, 

                            ],
                        })(
                            <Input
                                placeholder="Amount"
                            />,
                        )}
                        </Form.Item>
                        <Form.Item
                            label='Created Time'
                        >
                            {getFieldDecorator('createAt', {
                            rules: [
                                { 
                                    required: true, 
                                    message: 'Please enter amount!' 
                                }, 

                            ],
                        })(
                            <DatePicker
                                showTime
                                placeholder="Pick Time"
                            />,
                        )}
                        </Form.Item>
                        <Form.Item
                            label='Content'
                        >
                            {getFieldDecorator('content', {
                            rules: [
                                { 
                                    required: true, 
                                    message: 'Please enter content!' 
                                }, 

                            ],
                        })(
                            <div className="ec-editor" ref={this.editorRef}></div>
                        )}
                        </Form.Item>
                        <Form.Item wrapperCol={{ span:12, offset: 6}}>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Spin>
            </Card>
        )
    }
}


export default Form.create()(Edit)