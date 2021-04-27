import request from '@/utils/request'

export function list(params) {
    return request({
        url: '/api/actor/page',
        method: 'get',
        params
    })
}

export function get(id) {
    return request({
        url: '/api/actor/' + id,
        method: 'get'
    })
}

export function save(data) {
    return request({
        url: '/api/actor',
        method: 'post',
        data
    })
}

export function update(data) {
    return request({
        url: '/api/actor',
        method: 'put',
        data
    })
}

export function deleteById(id) {
    return request({
        url: '/api/actor/' + id,
        method: 'delete'
    })
}
