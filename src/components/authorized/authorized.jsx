import React from 'react'
import PropTypes from 'prop-types'
import CheckPermissions from './checkPermissions'

class Authorized extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    authority: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
      PropTypes.func,
    ]),
    noMatch: PropTypes.node,
  }

  static defaultProps = {
    children: undefined,
    authority: null,
    noMatch: null,
  }

  render() {
    const { children, authority, noMatch = null } = this.props
    const childrenRender = typeof children === 'undefined' ? null : children

    return CheckPermissions(authority, childrenRender, noMatch)
  }
}

export default Authorized
