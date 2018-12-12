class Handler {
  static requestSuccess(code) {
    if (code && code === '0') {
      return Promise.resolve()
    }

    const message = '未知错误'

    return Promise.reject(new Error(message))
  }

  static requestError(err) {
    let message = '未知错误'

    if (!err.response) {
      message = '服务器连接断开'

      return Promise.reject(new Error(message))
    }

    const { status } = err.response

    switch (status) {
      case 400:
        message = '客户端请求错误'
        break
      case 401:
        message = '你没有该权限'
        break
      case 403:
        message = '服务器拒绝'
        break
      case 404:
        message = '没有找到资源'
        break
      case 500:
        message = '服务器内部错误'
        break
      default:
        message = '未知错误'
        break
    }

    return Promise.reject(new Error(message))
  }
}

export default Handler
