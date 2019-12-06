// 等待
export function wait (time) {
  return new Promise(resolve => {
    setTimeout(() => resolve(), time)
  })
}
/**
 * Date或者时间格式，Number/数组，String年月日格式
 */
export function formatTime (date = new Date(), format = 0, slice = '-') {
  if (typeof date === 'string' || typeof date === 'number') date = new Date(date)
  const repair = num => num < 10 ? '0' + num : num
  const aFn = [
    () => date.getFullYear(),
    () => repair(date.getMonth() + 1),
    () => repair(date.getDate()),
    () => repair(date.getHours()),
    () => repair(date.getMinutes()),
    () => repair(date.getSeconds())
  ]
  const styles = [
    slice,
    slice,
    ' ',
    ':',
    ':',
    ''
  ]
  function oFn () {
    let str = ''
    Array.isArray(format)
      ? aFn.slice(format[0], format[1]).forEach((fn, i, arr) => {
        str += arr.length - 1 > i ? fn() + styles[format[0] + i] : fn()
      })
      : aFn.slice(format).forEach((fn, i) => {
        str += (fn() + styles[i])
      })
    return str
  }
  return oFn()
}
// 1是否比2大
export let contrast = (num1, num2) =>  new Date(num1).getTime() > new Date(num2).getTime()
export function week(date = new Date(), str = '星期', b) {
  if (typeof date === 'string' || typeof date === 'number') date = new Date(date)
  let arr = ['日', '一', '二', '三', '四', '五', '六']
  let day = date.getDay()
  return b && formatTime(Date.now(), [0, 3]) === formatTime(date, [0, 3])
    ? '今天'
    : str + arr[day]
}