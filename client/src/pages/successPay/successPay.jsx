import Taro , { Component } from '@tarojs/taro';
import { View, Text , Image } from '@tarojs/components';
import Ok from '@/img/ok.png'
import Back from '@/components/back/back'

import './successPay.less'

export default class SuccessPay extends Component {

  render() {
    return (
      <View>
        <View className='success'>
          <Image src={Ok} className='ok' />
          <Text>付款成功</Text>
        </View>
        <Back pageNum={5} />
      </View>
    );
  }
}
