import * as hallApi from '@/api/hall'

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
        const hallListResp = await hallApi.list(data)
        commit('SET_LIST', hallListResp.data.records)
        commit('SET_PAGINATION', hallListResp.data)
    },
    async get({ commit }, id) {
        const hallResp = await hallApi.get(id)
        commit('SET_ITEM', hallResp.data)
    },
    save(_, data) {
        return hallApi.save(data)
    },
    update(_, data) {
        return hallApi.update(data)
    },
    deleteById(_, id) {
        return hallApi.deleteById(id)
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
