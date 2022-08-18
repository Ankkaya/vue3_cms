import { Module } from 'vuex'
import { IDashboardState } from './types'
import { IRootState } from '@/store/types'

import {
  getCategoryGoodsCount,
  getCategoryGoodsFavor,
  getCategoryGoodsSale,
  getAddressGoodsSale
} from '@/service/main/analysis/dashboard'
const dashboardModule: Module<IDashboardState, IRootState> = {
  namespaced: true,
  state() {
    return {
      categoryGoodsCount: [],
      categoryGoodsSale: [],
      categoryGoodsFavor: [],
      addressGoodsSale: []
    }
  },
  mutations: {
    changeCategoryGoodsCount(state, categoryGoodsCount) {
      state.categoryGoodsCount = categoryGoodsCount
    },
    changeCategoryGoodsSale(state, categoryGoodsSale) {
      state.categoryGoodsSale = categoryGoodsSale
    },
    changeCategoryGoodsFavor(state, categoryGoodsFavor) {
      state.categoryGoodsFavor = categoryGoodsFavor
    },
    changeAddressGoodsSale(state, addressGoodsSale) {
      state.addressGoodsSale = addressGoodsSale
    }
  },
  actions: {
    async goDashboardDataAction({ commit }) {
      const categoryGoodsCountResult = await getCategoryGoodsCount()
      commit('changeCategoryGoodsCount', categoryGoodsCountResult.data)

      const categoryGoodsSaleResult = await getCategoryGoodsSale()
      commit('changeCategoryGoodsSale', categoryGoodsSaleResult.data)

      const categoryGoodsFavorResult = await getCategoryGoodsFavor()
      commit('changeCategoryGoodsFavor', categoryGoodsFavorResult.data)

      const addressGoodsSaleResult = await getAddressGoodsSale()
      commit('changeAddressGoodsSale', addressGoodsSaleResult.data)
    }
  }
}

export default dashboardModule
