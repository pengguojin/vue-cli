import Mock from 'mockjs'

export const getUserName = () => {
  // return "jin1"
  const template = {
    'name|2-3': 'jin',
    'age|100-200': 0
  }
  let i = 10
  let arr = []
  while (i--) {
    arr.push(template)
  }
  return Mock.mock(arr)
}