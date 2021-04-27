import request from '@/utils/request'

export function list(params) {
    return request({
        url: '/api/orders/page',
        method: 'get',
        params
    })
}

export function get(id) {
    return request({
        url: '/api/orders/' + id,
        method: 'get'
    })
}

export function save(data) {
    return request({
        url: '/api/orders',
        method: 'post',
        data
    })
}

export function update(data) {
    return request({
        url: '/api/orders',
        method: 'put',
        data
    })
}

export function deleteById(id) {
    return request({
        url: '/api/orders/' + id,
        method: 'delete'
    })
}
