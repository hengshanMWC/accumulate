/**
 * 验证，判断为true则返回语句
 * @param {Object} {语句：判断}
 * @return {String|undefined} 符合则语句
 * */
export let seek = obj => Object.keys(obj).find(key => obj[key])
// 首字母大型
export let firstToUpperCase = (name) => name[0].toUpperCase() + name.slice(1)