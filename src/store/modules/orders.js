import * as ordersApi from '@/api/orders'

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
        const ordersListResp = await ordersApi.list(data)
        commit('SET_LIST', ordersListResp.data.records)
        commit('SET_PAGINATION', ordersListResp.data)
    },
    async get({ commit }, id) {
        const ordersResp = await ordersApi.get(id)
        commit('SET_ITEM', ordersResp.data)
    },
    save(_, data) {
        return ordersApi.save(data)
    },
    update(_, data) {
        return ordersApi.update(data)
    },
    deleteById(_, id) {
        return ordersApi.deleteById(id)
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
