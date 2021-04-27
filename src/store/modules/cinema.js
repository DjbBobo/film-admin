import * as cinemaApi from '@/api/cinema'

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
        const cinemaListResp = await cinemaApi.list(data)
        commit('SET_LIST', cinemaListResp.data.records)
        commit('SET_PAGINATION', cinemaListResp.data)
    },
    async get({ commit }, id) {
        const cinemaResp = await cinemaApi.get(id)
        commit('SET_ITEM', cinemaResp.data)
    },
    save(_, data) {
        return cinemaApi.save(data)
    },
    update(_, data) {
        return cinemaApi.update(data)
    },
    deleteById(_, id) {
        return cinemaApi.deleteById(id)
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
