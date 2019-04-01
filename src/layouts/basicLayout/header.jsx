import React from 'react'
import PropTypes from 'prop-types'
import { Layout, Icon } from 'antd'

import styles from './header.less'

const { Header: AntHeader } = Layout

const Header = ({ collapsed, onClick }) => (
  <AntHeader className={styles.header} style={{ background: '#fff', padding: 0 }}>
    <Icon
      className={styles.trigger}
      type={collapsed ? 'menu-unfold' : 'menu-fold'}
      onClick={onClick}
    />
    <div>user</div>
  </AntHeader>
)

Header.propTypes = {
  collapsed: PropTypes.bool,
  onClick: PropTypes.func,
}

Header.defaultProps = {
  collapsed: false,
  onClick: () => {},
}

export default Header
