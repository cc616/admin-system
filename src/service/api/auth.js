export default {
  login: (opts) => {
    const { account, password } = opts
    const returnData = {
      code: '500',
      message: '账号与密码不符合',
      data: {},
    }

    if (account === 'admin' && password === '888888') {
      returnData.code = '0'
      returnData.data = {
        token: 'xxxxx',
      }

      return Promise.resolve(returnData)
    }

    return Promise.reject(returnData)
  },

  getAuth: () => Promise.resolve(),
}
