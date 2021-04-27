import request from '@/utils/request'

export function page(params) {
    return request({
        url: '/api/film/page',
        method: 'get',
        params
    })
}

export function list(params) {
    return request({
        url: '/api/film/list',
        method: 'get',
        params
    })
}

export function get(id) {
    return request({
        url: '/api/film/' + id,
        method: 'get'
    })
}

export function save(data) {
    return request({
        url: '/api/film',
        method: 'post',
        data
    })
}

export function update(data) {
    return request({
        url: '/api/film',
        method: 'put',
        data
    })
}

export function deleteById(id) {
    return request({
        url: '/api/film/' + id,
        method: 'delete'
    })
}
