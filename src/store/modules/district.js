import * as districtApi from '@/api/district'

const state = {
    list: [],
    item: {},
    treeData: {},
    pagination: {}
}

const mutations = {
    SET_LIST: (state, list) => {
        state.list = list
    },
    SET_TREE_DATA: (state, data) => {
        state.treeData = data
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
        const districtListResp = await districtApi.list(data)
        commit('SET_LIST', districtListResp.data.records)
        commit('SET_PAGINATION', districtListResp.data)
    },
    async tree({ commit }, data) {
        const districtListResp = await districtApi.tree(data)
        commit('SET_TREE_DATA', districtListResp.data)
    },
    async get({ commit }, id) {
        const districtResp = await districtApi.get(id)
        commit('SET_ITEM', districtResp.data)
    },
    save(_, data) {
        return districtApi.save(data)
    },
    update(_, data) {
        return districtApi.update(data)
    },
    deleteById(_, id) {
        return districtApi.deleteById(id)
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
