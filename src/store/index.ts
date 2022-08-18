import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { IRootState, IStoreType } from './types'

import loginModule from './login/login'
import systemModule from './main/system/system'
import dashboardModule from './main/analysis/dashboard'

import { getPageListData } from '@/service/main/system/system'
const store = createStore<IRootState>({
  state: () => {
    return {
      entireDepartment: [],
      entireRole: [],
      entireMenu: []
    }
  },
  mutations: {
    changeEntireDepartment(state, departmentList) {
      state.entireDepartment = departmentList
    },
    changeEntireRole(state, roleList) {
      state.entireRole = roleList
    },
    changeEntireMenu(state, menuList) {
      state.entireMenu = menuList
    }
  },
  getters: {},
  actions: {
    async getInitialDataAction({ commit }) {
      // 部门信息
      const departmentResult = await getPageListData('/department/list', {
        offset: 0,
        size: 1000
      })
      const { list: departmentList } = departmentResult.data
      commit('changeEntireDepartment', departmentList)

      // 角色信息
      const roleResult = await getPageListData('/role/list', {
        offset: 0,
        size: 1000
      })
      const { list: roleList } = roleResult.data
      commit('changeEntireRole', roleList)

      // 权限信息
      const menuResult = await getPageListData('/menu/list', {})
      const { list: menuList } = menuResult.data
      commit('changeEntireMenu', menuList)
    }
  },
  modules: {
    loginModule,
    systemModule,
    dashboardModule
  }
})
export function setupStore() {
  store.dispatch('loginModule/loadLocalLogin')
}
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}
export default store
