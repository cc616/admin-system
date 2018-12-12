import React, { Component } from 'react'
import PropTypes from 'prop-types'
import pathToRegexp from 'path-to-regexp'
import { Link, withRouter } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'

import styles from './siderMenu.less'

const { Sider } = Layout
const { SubMenu, Item } = Menu

// /userInfo/2144/id => ['/userInfo','/useInfo/2144,'/userInfo/2144/id']
export function urlToList(url) {
  const urlList = url.split('/').filter(i => i)
  return urlList.map((urlItem, index) => `/${urlList.slice(0, index + 1).join('/')}`)
}

/**
 * Recursively flatten the data
 * [{path:string},{path:string}] => {path,path2}
 * @param  menu
 */
export const getFlatMenuKeys = menu =>
  menu.reduce((keys, item) => {
    keys.push(item.path)
    if (item.children) {
      return keys.concat(getFlatMenuKeys(item.children))
    }
    return keys
  }, [])

/**
 * Find all matched menu keys based on paths
 * @param  flatMenuKeys: [/abc, /abc/:id, /abc/:id/info]
 * @param  paths: [/abc, /abc/11, /abc/11/info]
 */
export const getMenuMatchKeys = (flatMenuKeys, paths) =>
  paths.reduce(
    (matchKeys, path) =>
      matchKeys.concat(flatMenuKeys.filter(item => pathToRegexp(item).test(path))),
    [],
  )

class SiderMenu extends Component {
  static defaultProps = {
    onClick: () => {},
  }

  static propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    onClick: PropTypes.func,
    menuData: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    collapsed: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props)
    this.menus = props.menuData
    this.flatMenuKeys = getFlatMenuKeys(props.menuData)
    this.state = {
      openKeys: this.getDefaultCollapsedSubMenus(props),
    }
  }

  /**
   * Convert pathname to openKeys
   * /list/search/articles = > ['list','/list/search']
   * @param  props
   */
  getDefaultCollapsedSubMenus(props) {
    const { location: { pathname } } = props || this.props

    return [getMenuMatchKeys(this.flatMenuKeys, urlToList(pathname))[0]]
  }

  // Get the currently selected menu
  getSelectedMenuKeys = () => {
    const { location: { pathname } } = this.props

    return getMenuMatchKeys(this.flatMenuKeys, urlToList(pathname))
  };

  isMainMenu = key => (
    this.menus.some(item => key && (item.key === key || item.path === key))
  )

  /**
   * 点击含有二级导航的一级导航
   * @param {Array<string>} 展开的导航栏
   */
  handleOpenChange = (openKeys) => {
    const lastOpenKey = openKeys[openKeys.length - 1]
    const moreThanOne = openKeys.filter(openKey => this.isMainMenu(openKey)).length > 1

    this.setState({
      openKeys: moreThanOne ? [lastOpenKey] : [...openKeys],
    })
  }

  /**
   * 点击无二级导航的一级导航栏或二级导航栏
   * @param {Object}
   */
  handleClick = (e) => {
    const { openKeys } = this.state
    const { onClick } = this.props
    const { keyPath } = e

    // 收起其他展开的导航
    if (keyPath.length === 1 && openKeys.length > 0) {
      this.setState({
        openKeys: [],
      })
    }

    if (onClick) {
      onClick()
    }
  }

  renderSubMenu = item => (
    <SubMenu
      key={item.path}
      title={<span><Icon type={item.icon} /><span>{item.name}</span></span>}
    >
      {
        item.children.map(children => (
          <Item key={children.path}>
            <Link to={children.path}>
              {children.name}
            </Link>
          </Item>
        ))
      }
    </SubMenu>
  )

  renderMenuList = () => {
    const menuList = this.menus.map(item => (
      item.children ? (
        this.renderSubMenu(item)
      ) : (
        <Item key={item.path}>
          <Link to={item.path}>
            <Icon type={item.icon} />{item.name}
          </Link>
        </Item>
      )
    ))

    return menuList
  }

  render() {
    const { collapsed } = this.props
    const { openKeys } = this.state
    let selectedKeys = this.getSelectedMenuKeys()
    if (!selectedKeys.length) {
      selectedKeys = [openKeys[openKeys.length - 1]]
    } else {
      selectedKeys = [selectedKeys[selectedKeys.length - 1]]
    }

    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className={styles.logo}>
          <span>logo</span>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          openKeys={openKeys}
          selectedKeys={selectedKeys}
          onOpenChange={this.handleOpenChange}
          onClick={this.handleClick}
        >
          {this.renderMenuList()}
        </Menu>
      </Sider>
    )
  }
}

export default withRouter(SiderMenu)
