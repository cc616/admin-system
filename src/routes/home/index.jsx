import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { Button, Pagination as AntPagination } from 'antd'
import Pagination from 'components/pagination'

@inject('homeStore')
@observer
class Home extends Component {
  static propTypes = {
    homeStore: PropTypes.shape({}).isRequired,
  }
  render() {
    const { homeStore } = this.props
    const { number, increase, decrease } = homeStore

    return (
      <div>
        <p>this is home page</p>
        <Link to="/about">goto About</Link>
        <div>当前数：{number}</div>
        <div>
          <Button type="primary" onClick={increase}>增加</Button>
          <Button type="primary" onClick={decrease}>减少</Button>
        </div>
        <div>
          <Pagination />
          <AntPagination total={100} />
        </div>
      </div>
    )
  }
}

export default Home
