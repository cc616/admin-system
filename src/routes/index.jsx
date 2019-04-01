import React, { Fragment } from 'react'
import * as Cookies from 'js-cookie'
import { Route, Redirect } from 'react-router'
import { HashRouter, Switch } from 'react-router-dom'
import DevTools from 'mobx-react-devtools'
import { Provider } from 'mobx-react'

import stores from 'stores'

import AsyncComponent from 'components/asyncComponent'
import Login from 'routes/login'

const BasicLayout = AsyncComponent(() => import('layouts/basicLayout'))

const isLogin = () => !!Cookies.get('Authorization')

const Routes = () => (
  <HashRouter>
    <Switch>
      <Route exact path="/" render={() => <Redirect to={`/${isLogin() ? 'home' : 'login'}`} />} />
      <Route path="/login" component={Login} />
      <BasicLayout />
    </Switch>
  </HashRouter>
)

const App = () => (
  <Fragment>
    <Provider {...stores}>
      <Routes />
    </Provider>
    {
      process.env.NODE_ENV === 'development' ? (
        <DevTools />
      ) : null
    }
  </Fragment>
)

export default App
