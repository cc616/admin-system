import React, { PureComponent } from 'react'
import { Button } from 'antd'
import PropTypes from 'prop-types'
import cls from 'classnames'

class CountDownBtn extends PureComponent {
  static defaultProps = {
    disabled: false,
    className: '',
    defaultCountDown: 59,
    onClick: () => {},
    children: () => {},
  }

  static propTypes = {
    disabled: PropTypes.boolean,
    className: PropTypes.string,
    defaultCountDown: PropTypes.number,
    onClick: PropTypes.func,
    children: PropTypes.func,
  }

  static timerId = null

  state = {
    countDown: 0,
  }

  componentWillUnmount() {
    clearTimeout(this.timerId)
  }

  onClick = () => {
    if (this.props.disabled || this.state.countDown > 0) {
      return
    }
    this.setState({
      countDown: this.props.defaultCountDown,
    }, () => {
      const { onClick } = this.props
      if (onClick) {
        onClick()
      }
      this.startCountDown()
    })
  }

  startCountDown = () => {
    this.timerId = window.setTimeout(() => {
      this.setState((prevState) => {
        if (prevState.countDown === 0) {
          clearTimeout(this.timerId)
          return {
            countDown: 0,
          }
        }
        this.startCountDown()
        return {
          countDown: prevState.countDown - 1,
        }
      })
    }, 1000)
  }

  render() {
    const { countDown } = this.state
    const btnDisabled = this.props.disabled || countDown > 0
    return (
      this.props.children ? (
        <span
          onClick={this.onClick}
          className={cls('count-down-btn', this.props.className, {
            'count-down-btn-disabled': btnDisabled,
          })}
        >
          {this.props.children(this.state.countDown)}
        </span>
      ) : (
        <Button
          className={cls('count-down-btn', this.props.className)}
          onClick={this.onClick}
          disabled={btnDisabled}
        >
          {countDown > 0 ? `${countDown}s` : '获取'}
        </Button>
      )
    )
  }
}

export default CountDownBtn
