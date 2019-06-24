export const mkTime = (row, column, cellValue) => {
  let time = new Date(cellValue)
  let month = time.getMonth() + 1
  let date = time.getDate()
  let hour = time.getHours()
  let minute = time.getMinutes()
  let second = time.getSeconds()
  return `${time.getFullYear()}-${month < 10 ? '0' + month : month}-${date < 10 ? '0' + date : date} ${hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute}:${second < 10 ? '0' + second : second}`
}

export const getTaskStatus = (row) => {
  if (!row.enable) {
    return '停止/已删除'
  } else if (row.pause) {
    return '暂停'
  } else {
    return '开启'
  }
}
