export default {
  /* 分类相关 */
  // 获取大分类别
  getTypeList (state, arg) {
    state.typeList = arg
  },
  // 根据大分类id，获取小分类别
  getTypeItem (state, arg) {
    state.typeItem = arg
  },
  /*   购物车相关 */
  // 设置购物车总价
  setSumPrice (state, arg) {
    state.sumPrice = arg
  },
  // 修改购物总数
  choseTotal (state, arg) {
    state.carList[arg.index].total = arg.total
  },
  // 勾选商品
  choseGoods (state, index) {
    state.carList[index].checked = !state.carList[index].checked
  },
  // 设置购物车
  setCatList (state, arg) {
    state.carList = arg
  },
  // 勾选全部
  checkAll (state, arg) {
    if (arg) {
      state.carList.forEach(el => (el.checked = false))
    } else {
      state.carList.forEach(el => (el.checked = true))
    }
  },
  // 获取所有订单明细
  getAllOrder (state, arg) {
    state.orderList = arg
  }
}
