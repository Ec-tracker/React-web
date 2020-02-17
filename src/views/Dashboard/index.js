import React, { Component,createRef } from 'react'
import {
    Card,
    Row,
    Col,
} from 'antd' 
import {getArticleViews} from '../../requests'
import './dashboard.less'

import echart from 'echarts'
export default class Dashboard extends Component {
    constructor(){
        super()
        this.articleAmount = createRef()
    }

    initArticleChart =() =>{
        this.articleChart = echart.init(this.articleAmount.current)
        getArticleViews()
            .then(resp => {
                const option = {
                    xAxis: {
                        type:'category',
                        boundaryGap:false,
                        data: resp.data.amount.map(item => item.month)
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        areaStyle:{},
                        type: 'line',
                        data: resp.data.amount.map(item => item.value)
                    }]
                }
                this.articleChart.setOption(option)
            })

    }
    

    componentDidMount(){
        this.initArticleChart()
    }
    render() {
        return (
        <>
            <Card 
                title="Dashborad" 
                bordered={false} 
            >
                <Row gutter={16}>
                    <Col className="gutter-row" span={6} >
                        <div className="ec-gutter-box" style={{backgroundColor:'#26C6DA'}}>col-6</div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <div className="ec-gutter-box" style={{backgroundColor:'#0063B1'}}>col-6</div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <div className="ec-gutter-box" style={{backgroundColor:'#FFB900'}}>col-6</div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <div className="ec-gutter-box" style={{backgroundColor:'#6B69D6'}}>col-6</div>
                    </Col>
                </Row>
            </Card>
            <Card 
                title='Recent Views'
                bordered={false}
            >
                <div ref={this.articleAmount} style={{height: '400px'}}>

                </div>
            </Card>
        </>
        )
    }
}
