import Taro from '@tarojs/taro';

export async function request(params) {
  const { success, data } = await (await Taro.cloud.callFunction(params)).result;
  if(success) return data
  return [];
}

export default request;
