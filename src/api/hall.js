import request from '@/utils/request'

export function list(params) {
    return request({
        url: '/api/hall/page',
        method: 'get',
        params
    })
}

export function get(id) {
    return request({
        url: '/api/hall/' + id,
        method: 'get'
    })
}

export function save(data) {
    return request({
        url: '/api/hall',
        method: 'post',
        data
    })
}

export function update(data) {
    return request({
        url: '/api/hall',
        method: 'put',
        data
    })
}

export function deleteById(id) {
    return request({
        url: '/api/hall/' + id,
        method: 'delete'
    })
}
