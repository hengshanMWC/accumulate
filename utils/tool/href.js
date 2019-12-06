// 前后添加backUrl返回
export function createBackUrl (href) {
  const arr = href.split(/#/g)
  let str = `${arr[0]}${arr[0].includes('?') ? '&' : '?'}backUrl=${encodeURIComponent(location.href)}`
  if (arr[1]) {
    str += `#${arr[1]}${arr[1].includes('?') ? '&' : '?'}backUrl=${encodeURIComponent(location.href)}`
  }
  return str
}
// 前后获取query参数
export function getQuery (param, query) {
  if (query && query[param]) return unescape(query[param])
  var reg = new RegExp('(^|&)' + param + '=([^&]*)(&|$)', 'i')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) {
    return unescape(r[2])
  }
  return null
}