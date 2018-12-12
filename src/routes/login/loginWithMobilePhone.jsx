import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Input, Form, Icon, Row, Col, Button } from 'antd'

import styles from './loginWithMobilePhone.less'

const FormItem = Form.Item

class LoginWithMobilePhone extends Component {
  static propTypes = {
    form: PropTypes.shape({}).isRequired,
  }

  constructor(props) {
    super(props)
    this.timerId = null
  }

  state = {
    captchaBtnDisabled: false,
    countDown: 59,
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  handleFetchCaptcha = () => {
    this.setState({
      captchaBtnDisabled: true,
    })

    this.timerId = setInterval(() => {
      this.setState((prevState) => {
        const { countDown } = prevState

        if (countDown === 0) {
          return ({
            captchaBtnDisabled: false,
            countDown: 59,
          })
        }

        return ({
          countDown: countDown - 1,
        })
      })
    }, 1000)
  }

  render() {
    const { captchaBtnDisabled, countDown } = this.state
    const { form } = this.props
    const { getFieldDecorator } = form

    return (
      <div>
        <FormItem>
          {getFieldDecorator('mobileNumber', {
            rules: [{ required: true, message: 'Please enter mobile number!' }],
            initialValue: '',
          })(<Input prefix={<Icon type="mobile" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="mobile number" />)}
        </FormItem>
        <FormItem>
          <Row gutter={9}>
            <Col span={16}>
              {getFieldDecorator('captcha', {
                rules: [{ required: true, message: 'Please enter captcha!' }],
                initialValue: '',
              })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="captcha" />)}
            </Col>
            <Col span={8}>
              <Button
                onClick={this.handleFetchCaptcha}
                className={styles['captcha-btn']}
                disabled={captchaBtnDisabled}
              >
                {
                  captchaBtnDisabled ? `${countDown}s` : '获取验证码'
                }
              </Button>
            </Col>
          </Row>
        </FormItem>
      </div>
    )
  }
}

export default LoginWithMobilePhone
