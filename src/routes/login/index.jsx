import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { Form, Checkbox, Button, Icon, message } from 'antd'
import classnames from 'classnames'

import LoginWithAccount from './loginWithAccount'
import LoginWithMobilePhone from './loginWithMobilePhone'

import styles from './style.less'

const cx = classnames.bind(styles)
const FormItem = Form.Item

@inject('authStore')
@observer
class Login extends Component {
  static propTypes = {
    form: PropTypes.shape({}).isRequired,
    authStore: PropTypes.shape({}).isRequired,
  }

  state = {
    currentKey: 'ACCOUNT',
  }

  setCurrentKeyToState = (key) => {
    this.setState({
      currentKey: key,
    })
  }

  handleClickAccount = () => {
    const key = 'ACCOUNT'
    if (this.state.currentKey === key) {
      return
    }

    this.setCurrentKeyToState(key)
  }

  handleClickMobile = () => {
    const key = 'MOBILE'
    if (this.state.currentKey === key) {
      return
    }

    this.setCurrentKeyToState(key)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { form, authStore } = this.props
    const { currentKey } = this.state
    const fieldNames = currentKey === 'ACCOUNT' ? ['username', 'password'] : ['mobileNumber', 'captcha']

    form.validateFields(fieldNames, (err, values) => {
      if (!err) {
        const {
          username, password, mobileNumber, captcha,
        } = values
        const account = { account: username, password }
        const mobilePhone = { account: mobileNumber, password: captcha }
        const opts = currentKey === 'ACCOUNT' ? account : mobilePhone

        authStore.login(opts)
          .catch((error) => {
            message.error(error.message)
          })
      }
    })
  }

  render() {
    const { currentKey } = this.state
    const tabNavClsWithAccount = cx({
      'tabs-nav': true,
      'tabs-nav--active': currentKey === 'ACCOUNT',
    })
    const tabNavClsWithMobile = cx({
      'tabs-nav': true,
      'tabs-nav--active': currentKey === 'MOBILE',
    })
    const tabPaneClsWithAccount = cx({
      'tabs-pane': true,
      'tabs-pane--show': currentKey === 'ACCOUNT',
    })
    const tabPaneClsWithMobile = cx({
      'tabs-pane': true,
      'tabs-pane--show': currentKey === 'MOBILE',
    })

    const { form } = this.props
    const { getFieldDecorator } = form

    return (
      <div className={styles.container}>
        <header className={styles.title}>简单的中后台管理系统</header>
        <Form className={styles['login-main']} onSubmit={this.handleSubmit}>
          <div className={styles['tabs-bar']}>
            {/* eslint-disable-next-line */}
            <span className={tabNavClsWithAccount} onClick={this.handleClickAccount}>
              账户密码登录
            </span>
            {/* eslint-disable-next-line */}
            <span className={tabNavClsWithMobile} onClick={this.handleClickMobile}>
              手机号登录
            </span>
          </div>
          <div className={tabPaneClsWithAccount}>
            <LoginWithAccount form={form} />
          </div>
          <div className={tabPaneClsWithMobile}>
            <LoginWithMobilePhone form={form} />
          </div>

          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>自动登录</Checkbox>)}
            <a className={styles['forgot-password']} href="/">忘记密码</a>
          </FormItem>
          <FormItem>
            <Button type="primary" className={styles['login-btn']} htmlType="submit" >登录</Button>
          </FormItem>
          <div>
            其他登录方式
            <Icon type="alipay-circle" theme="filled" className={styles.icon} />
            <Icon type="weibo-circle" theme="filled" className={styles.icon} />
            <Icon type="taobao-circle" theme="filled" className={styles.icon} />
            <Link to="register" className={styles.register}>注册账户</Link>
          </div>
        </Form>
      </div>
    )
  }
}

export default Form.create()(Login)
