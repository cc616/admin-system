import React, { Component } from 'react'
import PropTypes from 'prop-types'
import echarts from 'echarts/lib/echarts' // 必须
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/grid'
import 'echarts/lib/chart/bar'

export default class LineEcharts extends Component {
  static defaultProps = {
    option: {
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: '直接访问',
          type: 'bar',
          barWidth: '60%',
          data: [10, 52, 200, 334, 390, 330, 220],
        },
      ],
    },
  }
  static propTypes = {
    option: PropTypes.shape({}),
  }
  // constructor(props) {
  //   super(props)
  // }
  componentDidMount() {
    this.initPie()
  }

  componentDidUpdate() {
    this.initPie()
  }

  initPie = () => {
    const { option = {} } = this.props // 外部传入的data数据
    const myChart = echarts.init(this.ID) // 初始化echarts

    // 设置options
    myChart.setOption(option)
    // window.onresize = () => {
    //   myChart.resize()
    // }
  }


  render() {
    // const { width = '100%', height='300px' } = this.props
    return <div ref={(ID) => { this.ID = ID }} style={{ width: 500, height: 500 }} />
  }
}
