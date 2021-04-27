import * as sessionApi from '@/api/session'

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
        const sessionListResp = await sessionApi.list(data)
        commit('SET_LIST', sessionListResp.data.records)
        commit('SET_PAGINATION', sessionListResp.data)
    },
    async get({ commit }, id) {
        const sessionResp = await sessionApi.get(id)
        commit('SET_ITEM', sessionResp.data)
    },
    save(_, data) {
        return sessionApi.save(data)
    },
    update(_, data) {
        return sessionApi.update(data)
    },
    deleteById(_, id) {
        return sessionApi.deleteById(id)
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
