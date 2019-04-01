import React, { Component } from 'react'
import { createPortal } from 'react-dom'
import { getSessionStorage } from '@root/utils/sessionStorage'
import EmptyTip from '@shared/components/emptyTip'
import cls from 'classnames'
import { Icon } from 'antd'
import PropTypes from 'prop-types'

import './index.less'

class Modal extends Component {
  static defaultProps = {
    visible: false,
    onCancel: () => {},
  }

  static propTypes = {
    visible: PropTypes.bool,
    onCancel: PropTypes.func,
  }

  componentDidMount() {
    this.container.appendChild(this.el)
  }

  componentDidUpdate() {
    if (this.props.visible === true) {
      this.disableScroll()
    } else {
      this.enableScroll()
    }
  }

  componentWillUnmount() {
    this.container.removeChild(this.el)
  }

  el = document.createElement('div')
  container = document.body

  disableScroll = () => {
    document.body.style.overflow = 'hidden'
  }

  enableScroll = () => {
    document.body.style.overflow = ''
  }

  renderChildren = () => {
    const redeemQrCodeLink = getSessionStorage('redeemQrCodeLink')
    return (
      <div className={cls('iframe-modal', {
        'iframe-modal-hidden': !this.props.visible,
        'iframe-modal-open': this.props.visible,
      })}
      >
        <div className="iframe-modal-mask" />
        <div className="iframe-modal-wrap">
          <div className="iframe-modal-container">
            <div className="iframe-modal-close" onClick={this.props.onCancel}>
              <Icon type="close" />
            </div>
            <div className="iframe-modal-content">
              {
                redeemQrCodeLink ? (
                  <iframe title="iframe" width="100%" height="100%" src={redeemQrCodeLink} />
                ) : <EmptyTip text="获取二维码链接失败" />
              }
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return createPortal(this.renderChildren(), this.el)
  }
}

export default Modal
