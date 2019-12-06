import http from '@/api/http'
import linaUi from 'lina-ui'
const { Loading, Toast } = linaUi
export default async function apiBox (options, id, data, flyParam) {
  if (options.loading !== true) {
    Loading.hide()
    Loading.show(options.loading || '请求中...')
  }
  let res
  try {
    res = await http[options.name](id, data, flyParam)
    options.success && await options.success(res.data, res)
  } catch (error) {
    res = error
    if (options.fail) {
      await options.fail(error)
    } else if (error.status === 400) {
      Toast(error.response.data.message)
    } else {
      Toast(error)
    }
  }
  if (options.complete) {
    await options.complete()
  }
  if (options.loading !== true) Loading.hide()
  return res
}
