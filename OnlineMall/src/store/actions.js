import { baseUrl } from '@/config/application'

export default {
  /* 分类相关 */
  // 获取大分类别
  async getTypeList ({commit}) {
    let json = await (await fetch(`${baseUrl}/cla/list`)).json()
    commit('getTypeList', json)
  },
  // 根据大分类id，获取小分类别
  async getTypeItem ({commit}, arg) {
    let json = await (await fetch(`${baseUrl}/cla/detail?id=${arg}`)).json()
    commit('getTypeItem', json)
  },
  /*   购物车相关 */
  // 设置购物车总价
  async setSumPrice ({commit, state}) {
    let sum = 0
    state.carList.forEach(el => (sum += (el.checked ? (el.price * el.total) : 0)))
    commit('setSumPrice', sum)
  },
  // 设置购物车
  async setCatList ({commit, state}) {
    let json = await (await fetch(`${baseUrl}/car/list?id=1`)).json()
    commit('setCatList', json)
    let sum = 0
    state.carList.forEach(el => (sum += (el.checked ? (el.price * el.total) : 0)))
    commit('setSumPrice', sum) // 计算总价
  },
  // 勾选商品
  async choseTotal ({commit, state}, arg) {
    commit('choseTotal', arg)
  },
  // 勾选商品
  async choseGoods ({commit, state}, arg) {
    commit('choseGoods', arg)
  },
  // 勾选全部
  async checkAll ({commit}, arg) {
    commit('checkAll', arg)
  },
  // 获取订单列表
  async getAllOrder ({commit}, arg) {
    let json = await (await fetch(`${baseUrl}/order/list?id=1`)).json()
    commit('getAllOrder', json)
  }
}
