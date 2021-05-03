import * as filmApi from '@/api/film'

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
    async page({ commit }, data) {
        const filmListResp = await filmApi.page(data)
        commit('SET_LIST', filmListResp.data.records)
        commit('SET_PAGINATION', filmListResp.data)
    },
    async list({ commit }, data) {
        const filmListResp = await filmApi.list(data)
        commit('SET_LIST', filmListResp.data)
    },
    async get({ commit }, id) {
        const filmResp = await filmApi.get(id)
        commit('SET_ITEM', filmResp.data)
    },
    save(_, data) {
        return filmApi.save(data)
    },
    update(_, data) {
        return filmApi.update(data)
    },
    deleteById(_, id) {
        return filmApi.deleteById(id)
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
