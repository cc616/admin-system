import { flow, action, observable } from 'mobx'
import * as Cookies from 'js-cookie'
import { authApi } from 'service/api'
import Handler from 'utils/handler'

class AuthStore {
  @observable userName = null

  login = flow(function* login(opts) {
    try {
      const { code, data } = yield authApi.login(opts)

      yield Handler.requestSuccess(code)

      Cookies.set('Authorization', data.token)
      const userInfo = {
        name: opts.account,
      }
      localStorage.setItem('user', userInfo)

      return Promise.resolve()
    } catch (error) {
      return Handler.requestError(error)
    }
  })

  @action getUserInfo = () => {
    const userInfo = localStorage.getItem('user')
    this.userName = userInfo.name
  }
}

export default new AuthStore()
