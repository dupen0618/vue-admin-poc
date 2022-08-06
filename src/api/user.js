import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data
  })
}

export function login2(data) {
  return request({
    url: '/api/user/loginIn',
    method: 'post',
    params: data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function getInfo2(token) {
  return request({
    url: '/api/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

export function fetchList(query) {
  return request({
    url: '/api/user/pageList',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    params: query
  })
}

export function createUser(user) {
  return request({
    url: '/api/user/Create',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    params: user
  })
}

export function updateUser(user){
  return request({
    url: '/api/user/Update',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    params: user
  })
}

export function deleteUser(id){
  return request({
    url: '/api/user/delete/' + id,
    method: 'get'
  })
}

export function roleList() {
  return request({
    url: '/api/user/roleList',
    method: 'post'
  })
}
