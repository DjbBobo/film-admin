import * as actorApi from '@/api/actor'

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
        const actorListResp = await actorApi.list(data)
        commit('SET_LIST', actorListResp.data.records)
        commit('SET_PAGINATION', actorListResp.data)
    },
    async get({ commit }, id) {
        const actorResp = await actorApi.get(id)
        commit('SET_ITEM', actorResp.data)
    },
    save(_, data) {
        return actorApi.save(data)
    },
    update(_, data) {
        return actorApi.update(data)
    },
    deleteById(_, id) {
        return actorApi.deleteById(id)
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
