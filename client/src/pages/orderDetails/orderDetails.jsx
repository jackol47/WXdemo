import Taro , { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtList, AtListItem } from 'taro-ui'
import OrderList from '@/components/orderList/orderList'

export default class OrderDetails extends Component {

  

  render() {
    return (
      <View>
        <AtList>
            <OrderList />
            <AtListItem 
              title='备注'
              extraText='多加辣'
            />
            <AtListItem 
              title='订单号'
              extraText='123213'
            />
            <AtListItem 
              title='订单时间'
              extraText='05月4日'
            />
        </AtList>
      </View>
    );
  }
}