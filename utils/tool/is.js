// 空
export let isN = str => str === '' || str === undefined || str === null
// 是否汉字
export const isHanzi = str => /^[\u2E80-\u9FFF]+$/.test(str)
// 是否双字节
export const isByte = str => str.charCodeAt() > 255
/**
 * 是否是手机号码
 * @param {string|Number} tel
 * @return {Boolean}
 */
export let isTel = tel => /^(?:\+?86)?1(?:3\d{3}|5[^4\D]\d{2}|8\d{3}|7(?:[35678]\d{2}|4(?:0\d|1[0-2]|9\d))|9[189]\d{2}|66\d{2})\d{6}$/.test(tel)
//是否邮箱
export let isEmail = email => new RegExp('^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+$').test(email)
//是否是身份证
export let isIDCard = str => new RegExp(/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/).test(str)
//是否邮编
export let zipCode = code => new RegExp('^[0-9]{6}$').test(code)
// 统一信用代码
export let isCreditCode = str => /^[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/g.test(str)
//判断是否http://或者https://的开发
export let isProtocol = str => new RegExp('^http[s]?://').test(str)
//判断是否移动端
export let isMobile = () => navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
//是否安卓
export function isAndroid(){
  var u = navigator.userAgent;
  if(u.indexOf('Android') > -1 || u.indexOf('Linux') > -1){
    return true;
  }
}
