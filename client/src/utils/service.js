import requset from './request'

export function login() {
  return requset({name: 'ty-getOpenId'});
}

export default { login };
