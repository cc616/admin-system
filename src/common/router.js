import AsyncComponent from 'components/asyncComponent'
import { getMenuData } from './menu'

export const routerConfig = {
  '/home/analysis': {
    component: AsyncComponent(() => import('routes/analysis')),
  },
  '/home/monitor': {
    component: AsyncComponent(() => import('routes/home')),
  },
  '/form/basic-form': {
    component: AsyncComponent(() => import('routes/about')),
  },
}

export function getFlatMenuData(menus) {
  let keys = {}
  menus.forEach((item) => {
    if (item.children) {
      keys[item.path] = { ...item }
      keys = { ...keys, ...getFlatMenuData(item.children) }
    } else {
      keys[item.path] = { ...item }
    }
  })
  return keys
}

export const getRouterData = () => {
  const menuData = getFlatMenuData(getMenuData())

  const routerData = {}

  Object.keys(routerConfig).forEach((path) => {
    const menuItem = menuData[path]
    let router = routerConfig[path]
    router = {
      ...router,
      authority: router.authority || menuItem.authority,
    }
    routerData[path] = router
  })
  return routerData
}

/**
 * Get router routing configuration
 * { path:{name,...param}}=>Array<{name,path ...param}>
 * @param {string} path
 * @param {routerData} routerData
 */
export function getRoutes(path, routerData) {
  const routes = Object.keys(routerData).filter( // eslint-disable-line function-paren-newline
    routePath => routePath.indexOf(path) === 0,
  ) // eslint-disable-line function-paren-newline
  // Conversion and stitching parameters
  const renderRoutes = routes.map(item => ({
    exact: true,
    ...routerData[item],
    key: item,
    path: item,
  }))

  return renderRoutes
}

export default getRouterData
