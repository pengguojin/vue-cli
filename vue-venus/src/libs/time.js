/**
 * 时间格式化
 */
export const formatTime = (t) => {
  // 格式化时间 yyyy-MM-dd HH:mm:ss
  if (t) {
    let time = new Date(t)
    let month = time.getMonth() + 1
    let date = time.getDate()
    let hour = time.getHours()
    let minute = time.getMinutes()
    let second = time.getSeconds()
    return `${time.getFullYear()}-${month < 10 ? '0' + month : month}-${date < 10 ? '0' + date : date} ${hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute}:${second < 10 ? '0' + second : second}`
  } else {
    return ''
  }
}

export const nowTime = () => { // 获取当前时间 年-月-日
  let time = new Date()
  let month = time.getMonth() + 1
  return `${time.getFullYear()}-${month < 10 ? '0' + month : month}-${time.getDate()}`
}

export const timeStamp = (t) => {
  if (t) {
    t = t.replace('T', ' ')
    let time = new Date(t)
    return time.getTime()
  } else {
    return 0
  }
}
