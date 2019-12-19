/**
* base64转二进制
* @param base64
* @return {Blob}
*/
export function createBlob (base64) {
  let arr = base64.split(',')
  let mime = arr[0].match(/:(.*?);/)[1]
  let bstr = atob(arr[1])
  let n = bstr.length
  let u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], {
    type: mime
  })
}
export function createFileReader () {
  const fileReader = {
    obj: new FileReader(),
    resolve: null,
    reject: null
  }
  fileReader.obj = new FileReader()
  fileReader.obj.onload = function () {
    fileReader.resolve(this.result)
    fileReader.resolve = null
  }
  fileReader.obj.onerror = function () {
    fileReader.reject(this.error)
    fileReader.reject = null
  }
  return function (blob) {
    fileReader.obj.readAsDataURL(blob)
    return new Promise((resolve, reject) => {
      fileReader.resolve = resolve
      fileReader.reject = reject
    })
  }
}

export const createBase64 = createFileReader()