import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import styles from './style.less'

const cx = classnames.bind(styles)

const getPageTotal = (total = 0, pageSize = 0) => {
  if (pageSize === 0) {
    return 0
  }

  return Math.ceil(total / pageSize)
}

class Pagination extends Component {
  static defaultProps = {
    total: 49,
    pageSize: 10,
    current: 1,
  }

  static propTypes = {
    total: PropTypes.number,
    pageSize: PropTypes.number,
    current: PropTypes.number,
  }

  constructor(props) {
    super(props)
    this.state = {
      current: props.current,
    }
  }

  handleClick = (current) => {
    this.setState({
      current,
    })
  }

  handlePrevClick = () => {
    const { current } = this.state
    const prev = current - 1
    if (prev > 0) {
      this.handleClick(prev)
    }
  }

  handleNextClick = () => {
    const { current } = this.state
    const { total, pageSize } = this.props
    const next = current + 1
    const pageTotal = getPageTotal(total, pageSize)

    if (next <= pageTotal) {
      this.handleClick(next)
    }
  }

  renderPagination = (total, current) => {
    const list = []
    for (let i = 1; i <= total; i += 1) {
      const cls = cx({
        'pagination-item': true,
        'pagination-item--active': current === i,
      })
      list.push(<li className={cls} key={i} onClick={() => this.handleClick(i)}>{i}</li>) // eslint-disable-line
    }
    return list
  }

  render() {
    const { total, pageSize } = this.props
    const { current } = this.state
    const hasTotal = total !== 0
    const pageTotal = getPageTotal(total, pageSize)
    const prevCls = cx({
      'pagination-item': true,
      'pagination-item--disabled': current === 1,
    })
    const nextCls = cx({
      'pagination-item': true,
      'pagination-item--disabled': current === pageTotal,
    })

    return hasTotal ? (
      <div>
        <ul className={styles.pagination}>
          {/* eslint-disable-next-line */}
          <li className={prevCls} onClick={this.handlePrevClick}>{'<'}</li>
          {this.renderPagination(pageTotal, current)}
          {/* eslint-disable-next-line */}
          <li className={nextCls} onClick={this.handleNextClick}>{'>'}</li>
        </ul>
      </div>
    ) : null
  }
}

export default Pagination
