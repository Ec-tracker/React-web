import React, { Component } from 'react'
import {
    Card,
    Button,
    Table,
    Tag,
    Modal,
    Typography,
    message,
    Tooltip
} from 'antd'
import moment from 'moment'
import XLSX from 'xlsx'

import {getArticles, deleteArticleById} from '../../requests'
const ButtonGroup = Button.Group
const titleDisplayMap = {
  id: 'id',
  title: 'Title',
  author: 'Author',
  amount: 'Amount',
  createAt: 'Created Time',

}

export default class ArticleList extends Component {
    constructor(){
      super()
      this.state = {
        dataSource: [],
        columns:[
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
          },
          {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
          },
          {
              title: 'Action',
              dataIndex: 'Action',
              key: 'Action',
              render: (text, record, index) => {
                  return <Button>Edit</Button>
              }
          },
        ],
        total: 0,
        isLoading: false,
        offset: 0,
        limited: 10,
        deleteArticleModalTitle: '',
        isShowArticleModle: false,
        deleteArticleConfirmLoading: false,
        deleteArticleID: null,
      }
    }
    toExcel = () =>{
      //in actual development, this is controled by back end
      const data = [Object.keys(this.state.dataSource[0])]
      for (let i =0; i < this.state.dataSource.length; i++)
      {
        // const values = Object.values(this.state.dataSource[i])
        data.push([
          this.state.dataSource[i].id,
          this.state.dataSource[i].title,
          this.state.dataSource[i].author,
          this.state.dataSource[i].amount,
          moment(this.state.dataSource[i].createAt).format('MM/DD/YYYY HH:mm:ss')
        ])
      }

      
      
      /* convert state to workbook */
      const ws = XLSX.utils.aoa_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
      // /* generate XLSX file and send to client */
      XLSX.writeFile(wb, `articles-${this.state.offset / this.state.limited +1}-${moment().format('MM-DD-YYY-HH-mm-ss')}.xlsx`)
    }
    showDeleteArticleModal = (record) => {
      // Modal.confirm({
      //   title: <Typography>Are you sure to delete {record.title}?</Typography>,
      //   content:`This action cannot be redo.`,
      //   okText: 'Sure',
      //   cancel: 'Cancel',

      //   onOk(){
      //     deleteArticle(record.id)
      //       .then(resp => {
      //         console.log(resp)
      //       })
      //   }
      // })
      // console.log(this)

      this.setState({
        deleteArticleModalTitle: record.title,
        isShowArticleModle:true,
        deleteArticleID: record.id,
      })

    }
    toDeleteArticle = (id) =>{
      this.setState({
        deleteArticleConfirmLoading:true
      })
      deleteArticleById(this.state.deleteArticleID)
        .then(resp => {
          message.success("resp.msg")
          this.setState({
            offset: 0
          }, () => {
            this.getData()
          })
        })
        .finally(()=>{
          this.setState({
            deleteArticleConfirmLoading:false,
            isShowArticleModle:false
          })
        })
    }
    hideDeleteModal = () => {
      this.setState({
        isShowArticleModle: false,
        deleteArticleModalTitle: '',
        deleteArticleConfirmLoading: false
      })
    }
    onShowSizeChange = (curren, size) => {
      this.setState({
        offset: 0,
        limited: size
      }, ()=> {
        this.getData()
      })
    }
    onPageChange = (page, pageSize) => {
      this.setState({
        offset: pageSize * (page -1 ),
        limited: pageSize
      }, ()=> {
        this.getData()
      })
    }
    createColumns = (columnKeys) => {
      const columns =  columnKeys.map(item => {
        if (item === 'amount')
          return {
              title: titleDisplayMap[item],
              key: item,
              render: (text, record )=>{
                const { amount } = record

                return( 
                  <Tooltip title={amount > 200 ? "Exceeds 230" : "Unexceed 230"}>
                    <Tag color={amount > 200 ? 'red': 'green'}>{record.amount}</Tag>
                  </Tooltip>)
              }
          }
        if (item === 'createAt')
          return {
              title: titleDisplayMap[item],
              key: item,
              render: (text, record )=>{
                const { createAt } = record

                return moment(createAt).format('MM/DD/YYYY')
              }
          }
        return {
            title: titleDisplayMap[item],
            dataIndex: item,
            key: item,
        }
      })
      columns.push({
        title: 'Option',
        key: 'action',
        render: (record) => {
          return(
            <ButtonGroup>
              <Button size='small' type='primary' onClick={this.toEdit.bind(this, record.id)}>Edit</Button>
              <Button size='small' type='danger' onClick={this.showDeleteArticleModal.bind(this, record)}>Delete</Button>
            </ButtonGroup>
          )
        }
      })
      return columns
    }
    toEdit = (id) => {

      this.props.history.push(`/admin/article/edit/${id}`)
    }

    setData = (state) => {
      if(this.updater.isMounted(this))
        return
        this.setState(state)
    }
    getData = () => {
      this.setState({
        isLoading: true
      })
      getArticles(this.state.offset, this.state.limited)
        .then(resp => {
          const columnKeys = Object.keys(resp.data.list[0])
          const columns = this.createColumns(columnKeys)
          
          if(this.updater.isMounted(this))
            return
            this.setData({
              total:resp.total,
              dataSource: resp.data.list,
              columns: columns
            })
          })
        .catch(err => {

        })
        .finally(() => {

          if(this.updater.isMounted(this))
          return
          this.setState({
            isLoading:false
          })
        })
    }
    componentDidMount(){
      this.getData()
    }
    render() {
        return (
            <Card 
                title="Article List" 
                bordered={false} 
                extra={<Button onClick={this.toExcel}>Export to Excel</Button>}>
                <Table 
                    rowKey={record => record.id}
                    dataSource={this.state.dataSource} 
                    columns   ={this.state.columns} 
                    pagination={{
                      current: this.state.offset / (this.state.limited) + 1,
                      total: this.state.total,
                      hideOnsinglePage: true,
                      onChange: this.onPageChange,
                      showSizeJumper:true,
                      showSizeChanger: true,
                      onShowSizeChange: this.onShowSizeChange,
                      pageSizeOptions: ['10', '20','30']
                    }}
                    loading={this.state.isLoading}
                />
                <Modal
                  title='This action cannot be undo'
                  visible= {this.state.isShowArticleModle}
                  onCancel={this.hideDeleteModal}
                  confirmLoading={this.state.deleteArticleConfirmLoading}
                  onOk={this.toDeleteArticle}
                >
                      <Typography>Are you sure to delete {this.state.deleteArticleModalTitle}?</Typography>
                  </Modal>
            </Card>
        )
    }
}
