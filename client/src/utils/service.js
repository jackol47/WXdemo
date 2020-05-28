import { request } from './request'

export function login(avatarUrl, nickName) {
  const param = {
    name: 'ty-getOpenId',
    data: {
      avatarUrl,
      nickName
    }
  }
  return request(param);
}

export function getOrderForm() {
  return request({
    name: 'ty-getOrderList'
  })
}

export function submitOrder(menuIdList, note) {
  const param = {
    name: 'ty-submitOrder',
    data: {
      menuIdList,
      note
    }
  }
  return request(param)
}

export function getDish() {
  return request({name: 'ty-getDish'})
}

export function updatePoint(remainder) {
  const param = {
    name: 'ty-updatePoint',
    data: {
      remainder
    }
  }
  return request(param)
}

export function getUserInfo() {
  return request({name: 'ty-getUserInfo'})
}

export function exchange(commodityId) {
  const param = {
    name: 'ty-exchange',
    data: {
      commodityId
    }
  }
  return request(param)
}

export function getRecord() {
  return request({name: 'ty-getRecord'})
}

export function changeStatus(orderId) {
  const param = {
    name: 'ty-changeStatus',
    data: {
      orderId
    }
  }
  return request(param)
}

export default { login, getOrderForm, submitOrder, getDish, updatePoint, getUserInfo, exchange, getRecord, changeStatus };
