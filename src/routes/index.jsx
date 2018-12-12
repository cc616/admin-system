import React, { Fragment } from 'react'
import { Route, Redirect } from 'react-router'
import { HashRouter, Switch } from 'react-router-dom'
import DevTools from 'mobx-react-devtools'
import { Provider } from 'mobx-react'

import stores from 'stores'

import AsyncComponent from 'components/asyncComponent'
import Login from 'routes/login'

const BasicLayout = AsyncComponent(() => import('layouts/basicLayout'))

const Routes = () => (
  <HashRouter>
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/home" />} />
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
