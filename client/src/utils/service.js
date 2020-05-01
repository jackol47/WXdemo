import requset from './request'

export function login() {
  return requset({name: 'ty-getOpenId'});
}

export function sum() {
  const param = {
    name: 'sum'
  }
  return requset(param)
}

export default { login };
