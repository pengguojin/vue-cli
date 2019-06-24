import Mock from 'mockjs'
import { getUserName } from './response/user'

// 模拟数据
Mock.mock('/user', 'get', getUserName)

export default Mock