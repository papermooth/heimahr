import {getToken,setToken,removeToken} from '@/utils/auth'
import {login, getUserInfo} from '@/api/user'

const state = {
  token: getToken(),
  userInfo:{}

}
const mutations = {
  setToken(state,token){
    state.token = token
    setToken(token)
  },
  removeToken(state){
    state.token = null
    removeToken()
  },
  setUserInfo(state,userInfo){
    state.userInfo = userInfo
  }
}
const actions = {
  async login(context,data){
    console.log(data)
    const token = await login(data)
    context.commit('setToken',token)
  },
  async getUserInfo (context){
    const result = await getUserInfo()
    context.commit("setUserInfo",result)
  },
  // 退出登录的action
  logout(context) {
    context.commit('removeToken') // 删除token
    context.commit('setUserInfo', {}) // 设置用户信息为空对象
  }

}
export default {
   namespaced: true,
   state,
   mutations,
   actions
}