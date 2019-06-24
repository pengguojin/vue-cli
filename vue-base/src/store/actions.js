import { getUserInfo } from "@/api/test"
const actions = {
  async getUserName({ commit }) {
    try {
      const { data, status } = await getUserInfo()
      if (status === 200)
        commit('USER_NAME', data)
      else
        console.log("请求出错，请求码：", status)
    } catch (error) {
      console.log(error);
    }
  }
}
export default actions