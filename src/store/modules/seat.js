import * as seatApi from '@/api/seat'

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
        const seatListResp = await seatApi.list(data)
        commit('SET_LIST', seatListResp.data.records)
        commit('SET_PAGINATION', seatListResp.data)
    },
    async get({ commit }, id) {
        const seatResp = await seatApi.get(id)
        commit('SET_ITEM', seatResp.data)
    },
    save(_, data) {
        return seatApi.save(data)
    },
    update(_, data) {
        return seatApi.update(data)
    },
    deleteById(_, id) {
        return seatApi.deleteById(id)
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
