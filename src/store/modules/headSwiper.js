import * as headSwiperApi from '@/api/headSwiper'

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
        const headSwiperListResp = await headSwiperApi.list(data)
        commit('SET_LIST', headSwiperListResp.data.records)
        commit('SET_PAGINATION', headSwiperListResp.data)
    },
    async get({ commit }, id) {
        const headSwiperResp = await headSwiperApi.get(id)
        commit('SET_ITEM', headSwiperResp.data)
    },
    save(_, data) {
        return headSwiperApi.save(data)
    },
    update(_, data) {
        return headSwiperApi.update(data)
    },
    deleteById(_, id) {
        return headSwiperApi.deleteById(id)
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
