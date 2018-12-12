import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, withRouter } from 'react-router-dom'
import { Layout } from 'antd'
import Exception from 'components/exception'
import AuthorizedRoute from 'components/authorized'
import { getMenuData } from '../../common/menu'
import { getRouterData, getRoutes } from '../../common/router'
import Header from './header'
import SiderMenu from './siderMenu'

import styles from './basicLayout.less'

const { Content } = Layout

class BasicLayout extends Component {
  static propTypes = {
    history: PropTypes.shape({
      location: PropTypes.shape({
        pathname: PropTypes.string,
      }),
    }).isRequired,
  }
  state = {
    collapsed: false,
  }

  handleToggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }

  render() {
    const { collapsed } = this.state
    const routerData = getRouterData()
    const path = this.props.history.location.pathname

    return (
      <Layout className={styles.container}>
        <SiderMenu
          collapsed={collapsed}
          menuData={getMenuData()}
        />
        <Layout className={styles.main}>
          <Header collapsed={collapsed} onClick={this.handleToggle} />
          <Content className={styles.content}>
            <Switch>
              {
                getRoutes(path, routerData).map(item => (
                  <AuthorizedRoute
                    key={item.key}
                    path={item.path}
                    component={item.component}
                    exact={item.exact}
                    authority={item.authority}
                    redirectPath="/exception/403"
                  />
                ))
              }
              <Route render={() => <Exception type={404} />} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default withRouter(BasicLayout)
