/**
 * 序列化，返回新的object
 * @param {Object} obj
 * @return {Object}
 */
export let newJson = obj => JSON.parse(JSON.stringify(obj))