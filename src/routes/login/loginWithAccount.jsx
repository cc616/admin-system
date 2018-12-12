import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Input, Form, Icon } from 'antd'

const FormItem = Form.Item

class LoginWithAccount extends Component {
  static propTypes = {
    form: PropTypes.shape({}).isRequired,
  }
  state = {}

  render() {
    const { form } = this.props
    const { getFieldDecorator } = form

    return (
      <div>
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please enter username!' }],
            initialValue: '',
          })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="admin" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please enter password!' }],
            initialValue: '',
          })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="888888" />)}
        </FormItem>
      </div>
    )
  }
}

export default LoginWithAccount
