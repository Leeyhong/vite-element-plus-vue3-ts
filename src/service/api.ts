import { request } from './axios'

export function login(data?:any) {
    return request('/login?', data, 'post')
}
