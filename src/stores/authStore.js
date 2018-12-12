import { flow } from 'mobx'
import { authApi } from 'service/api'
import Handler from 'utils/handler'

class AuthStore {
  login = flow(function* login(opts) {
    try {
      const { code } = yield authApi.login(opts)

      yield Handler.requestSuccess(code)

      return Promise.resolve()
    } catch (error) {
      return Handler.requestError(error)
    }
  })

  getAuth = flow(function* getAuth() {
    try {
      yield authApi.getAuth()
      return Promise.resolve()
    } catch (error) {
      return Handler.requestError(error)
    }
  })
}

export default new AuthStore()
