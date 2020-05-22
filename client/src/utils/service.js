import { request } from './request'

export function login() {
  return request({name: 'ty-getOpenId'});
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

export function getPoint() {
  return request({name: 'ty-getPoint'})
}

export default { login, getOrderForm, submitOrder, getDish, updatePoint, getPoint };
