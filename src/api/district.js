import request from '@/utils/request'

export function list(params) {
    return request({
        url: '/admin/api/district/page',
        method: 'get',
        params
    })
}

export function tree(params) {
    return request({
        url: '/admin/api/district/tree',
        method: 'get',
        params
    })
}

export function get(id) {
    return request({
        url: '/admin/api/district/' + id,
        method: 'get'
    })
}

export function save(data) {
    return request({
        url: '/admin/api/district',
        method: 'post',
        data
    })
}

export function update(data) {
    return request({
        url: '/admin/api/district',
        method: 'put',
        data
    })
}

export function deleteById(id) {
    return request({
        url: '/admin/api/district/' + id,
        method: 'delete'
    })
}
