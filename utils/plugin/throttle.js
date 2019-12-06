import http from '@/api/http'
import linaUi from 'lina-ui'
const { Loading, Toast } = linaUi
/**
 * 封装fetch
 * @param {object} param
 *  @param {string} name - 链接
 *  @param {string} [loading = '请求中...']
 *  @param {boolean} [errorToast = true] - 是否显示报错Toast
 *  @param {function} [plan] - 准备回调，返回false停止，有参数param
 *  @param {function} [success] - 成功回调
 *  @param {function} [fail] - 失败回调
 *  @param {function} [complete] - 结束回调
 *  @param {string|function} [debounce] - 频繁点击的 Toast显示|函数
 * @param {object} flyParam - fiy的其他配置项
 */
export default (_this, param, flyParam) => {
  let b = true
  param = merge(param, _this)
  return async (id, data) => {
    if (!b) {
      await isProgress(param.debounce)
      return
    }
    if (typeof param.plan === 'function') {
      if (!param.plan(param, flyParam)) return
    }
    b = false
    let completeData = null
    if (param.loading !== false) {
      Loading.hide()
      Loading.show(param.loading)
    }
    const fnData = { id, data, flyParam }
    try {
      const res = await http[param.name](id, data, flyParam)
      completeData = res
      if (param.loading !== false) Loading.hide()
      typeof param.success === 'function' && await param.success(res.data, res, fnData)
    } catch (error) {
      console.error(error)
      completeData = error
      if (param.loading !== false) Loading.hide()
      if (typeof param.fail === 'function') {
        await param.fail(error, fnData)
      } else if (param.errorToast && error.status === 400) {
        Toast(error.response.data.message)
      } else if (param.errorToast) {
        Toast(error.message)
      }
    }
    typeof param.complete === 'function' && await param.complete(completeData, fnData)
    b = true
  }
}
function merge (param, _this) {
  const defaultParam = {
    loading: '请求中...',
    errorToast: true
  }
  const data = Object.assign({}, defaultParam, param)
  if (_this) {
    Object.keys(data).forEach(key => {
      if (key !== 'http' && typeof data[key] === 'function') {
        data[key] = data[key].bind(_this)
      }
    })
  }
  return data
}
// 进行中逻辑
async function isProgress (debounce) {
  const type = typeof debounce
  if (type === 'string') {
    Toast(debounce)
  } else if (type === 'function') {
    await debounce()
  }
}
