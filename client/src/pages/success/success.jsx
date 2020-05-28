import Taro , { Component } from '@tarojs/taro';
import { View, Text, Image} from '@tarojs/components';
import Ok from '@/img/ok.png'
import Back from '@/components/back/back'
import {getOrderForm, changeStatus} from '@/utils/service'
import './success.less'


export default class Success extends Component {

  state = {
    isClick: false
  }

  async componentDidMount () {
    const {orderList} = await getOrderForm()
    const {orderId} = orderList[orderList.length - 1]
    this.setState({orderId})
  }

  handleClick = () => {
    this.setState({isClick: true})
    changeStatus(this.state.orderId)
    Taro.navigateTo({
      url: '/pages/successPay/successPay?id=1'
    })
  }

  turnToOrderDetailsPage = () =>{
    Taro.navigateTo({
      url: '/pages/latestOrder/latestOrder?id=1'
    })
  }


  render() {
    const { isClick } = this.state
    return (
      <View>
        <View className='success'>
            <Image src={Ok} className='ok' />
            <Text>下单成功</Text>
        </View>
        <View className='table'>桌号01</View>
        <View className='ckeckBox'>
            <Text>服务员即将送餐</Text>
            <View style='display:flex;align-items:center;' className='check'>
              <View style='width:200rpx' onClick={this.turnToOrderDetailsPage}>查看订单</View>
              <View style='background-color:orange;width:150rpx' onClick={this.handleClick}>{isClick ? '已结账' : '结账'}</View>

            </View>
        </View>
        <Back pageNum={3} text='继续点菜' />
      </View>
    );
  }
}