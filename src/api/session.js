import request from '@/utils/request'

export function list(params) {
    return request({
        url: '/admin/api/session/page',
        method: 'get',
        params
    })
}

export function get(id) {
    return request({
        url: '/admin/api/session/' + id,
        method: 'get'
    })
}

export function save(data) {
    return request({
        url: '/admin/api/session',
        method: 'post',
        data
    })
}

export function update(data) {
    return request({
        url: '/admin/api/session',
        method: 'put',
        data
    })
}

export function deleteById(id) {
    return request({
        url: '/admin/api/session/' + id,
        method: 'delete'
    })
}
