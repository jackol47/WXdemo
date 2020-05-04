import Taro , { Component } from '@tarojs/taro';
import { View, Text, Image} from '@tarojs/components';
import Ok from '@/img/ok.png'
import './success.less'

export default class Success extends Component {

  turnToOrderDetailsPage = () =>{
    Taro.navigateTo({
      url: '/pages/orderDetails/orderDetails'
    })
  }


  render() {
    return (
      <View>
        <View className='success'>
            <Image src={Ok} className='ok' />
            <Text>下单成功</Text>
        </View>
        <View className='ckeckBox'>
            <Text>服务员即将送餐</Text>
            <View className='check' onClick={this.turnToOrderDetailsPage}>查看订单</View>
        </View>
      </View>
    );
  }
}