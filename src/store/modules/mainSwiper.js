import * as mainSwiperApi from '@/api/mainSwiper'

const state = {
    list: [],
    item: {},
    pagination: {}
}

const mutations = {
    SET_LIST: (state, list) => {
        state.list = list
    },
    SET_PAGINATION: (state, data) => {
        state.pagination.currentPage = Number.parseInt(data.current)
        state.pagination.pageSize = Number.parseInt(data.size)
        state.pagination.total = Number.parseInt(data.total)
    },
    SET_ITEM: (state, item) => {
        state.item = item
    }
}

const actions = {
    async list({ commit }, data) {
        const mainSwiperListResp = await mainSwiperApi.list(data)
        commit('SET_LIST', mainSwiperListResp.data.records)
        commit('SET_PAGINATION', mainSwiperListResp.data)
    },
    async get({ commit }, id) {
        const mainSwiperResp = await mainSwiperApi.get(id)
        commit('SET_ITEM', mainSwiperResp.data)
    },
    save(_, data) {
        return mainSwiperApi.save(data)
    },
    update(_, data) {
        return mainSwiperApi.update(data)
    },
    deleteById(_, id) {
        return mainSwiperApi.deleteById(id)
    }
}

const getters = {}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
