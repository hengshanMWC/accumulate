/**
 * 获取页面滚动距离和页面总高度
 * @return {Object} { scrollTop, scrollHeight }
 */
export function getScroll () {
  let scrollTop = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop
  let scrollHeight = document.documentElement.scrollHeight ? document.documentElement.scrollHeight : document.body.scrollHeight
  return { scrollTop, scrollHeight }
}
/**
 * 监控点击
 * telInput + telKeyboard：实现监控移动端键盘
 * @param {Dom} dom 启动事件委托的元素
 * @param {Object} fn 委托下面点击：input是text||number && 没有被禁 && 没有触底，则调用fn.yes。相反fn.no
 */
export function telInput (dom, fn) {
  dom.addEventListener('click', e => {
    let input = e.target
    let type = input.type
    let allow = [
      'text', 'password', 'tel', 'email', 'url', 'search',
      'number', 'range'
    ]
    let { scrollTop, scrollHeight } = getScroll()
    let scroll = scrollHeight <= (scrollTop + window.innerHeight + 100)

    // 会触发键盘弹起的宽，并且没有被禁
    if (allow.indexOf(type) !== -1 &&
      !input.disabled &&
      !scroll) {
      typeof fn.yes === 'function' && fn.yes()
    } else {
      typeof fn.no === 'function' && fn.no()
    }
  })
}

/**
 * 监控滚动
 * telInput + telKeyboard：实现监控移动端键盘
 * @param {Object} fn: resize触发fn.resize，滚动：总高度 <= 条件，则触发fn.yes，fn.no
 * @param {Number} num：触底加成条件
 */
export function scrollAndResize (fn, num = 0) {
  let normalHeight = window.innerHeight
  typeof fn.resize === 'function' && window.addEventListener('resize', e => fn.resize(normalHeight === window.innerHeight))
  window.addEventListener('scroll', e => {
    let { scrollTop, scrollHeight } = getScroll()
    let scroll = scrollHeight <= (scrollTop + window.innerHeight + num)
    if (scroll) {
      typeof fn.yes === 'function' && fn.yes()
    } else if (normalHeight !== window.innerHeight) {
      typeof fn.no === 'function' && fn.no()
    }
  })
}
