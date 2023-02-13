import axios from 'axios'
import objectAssign from 'object-assign'

import { APP_API_URL } from '../config'
import LocalStorageUtils from './LocalStorageUtils'

const query = axios.create()

const mutation = axios.create()

export const getHeaders = () => {
    return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${LocalStorageUtils.getToken()}`,
    }
}

export const request = (endpoint, method, headers = {}, params = {}, body = {}, signal) => {
    return query({
        url: APP_API_URL + endpoint,
        method: method,
        headers: objectAssign(getHeaders(), headers),
        params: objectAssign(params),
        data: body,
        signal: signal,
    })
}

export const mutate = (endpoint, method, headers = {}, params = {}, body = {}) => {
    return mutation({
        url: APP_API_URL + endpoint,
        method: method,
        headers: objectAssign(getHeaders(), headers),
        params: objectAssign(params),
        data: body,
    })
}

export const get = ({ endpoint, params = {}, headers = {}, signal = {} }) => {
    return request(endpoint, 'GET', headers, params, signal)
}

export function post({ endpoint, body = {}, params = {}, headers = {} }) {
    return mutate(endpoint, 'POST', headers, params, body)
}

export const put = ({ endpoint, body = {}, params = {}, headers = {} }) => {
    return mutate(endpoint, 'PUT', headers, params, body)
}

export const remove = ({ endpoint, body = {}, params = {}, headers = {} }) => {
    return mutate(endpoint, 'DELETE', headers, params, body)
}

// {id: 1, value: 1}
// ;[
//     {
//         id: 1,
//         value: 1,
//     },
//     {
//         id: 2,value: 2
//     }
// ]

// [{
//     id: 1,value: 1
// }]
