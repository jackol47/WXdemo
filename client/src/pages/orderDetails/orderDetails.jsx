import Taro , { Component } from '@tarojs/taro';
import { View, ScrollView } from '@tarojs/components';
import { AtList, AtListItem } from 'taro-ui'
import OrderList from '@/components/orderList/orderList'
import { getOrderForm } from '@/utils/service'
import Back from '@/components/back/back';

export default class OrderDetails extends Component {

  state = {
    orderId: '',
    orderItem: {},
    menuList: []
  }

  async componentDidMount() {
    const { orderList } = await getOrderForm()

    await Taro.getStorage({
      key: 'orderId',
      success: (res) => {
        this.setState({orderId: res.data})
      }
    })
    
    const orderItem = orderList.filter(item => item.orderId === this.state.orderId)[0]
    const { menuList } = orderItem
    this.setState({
      orderItem: orderItem,
      menuList: menuList,
      buildDate: new Date(orderItem.buildDate)
    })
  }
  

  render() {
    const { orderId, orderItem, menuList, buildDate } = this.state
    console.log('orderItem', orderItem);
    console.log('menuList', menuList);
    return (
      <View>
        <AtList>
          <ScrollView style='height: 630rpx' scrollY>
            <OrderList menuList={menuList} />
          </ScrollView>
            <AtListItem 
              title='备注'
              extraText={orderItem.note}
            />
            <AtListItem 
              title='总价'
              extraText={`${orderItem.sumPrice}元`}
            />
            <AtListItem 
              title='订单号'
              extraText={orderId}
            />
            <AtListItem 
              title='订单时间'
              note={buildDate.toLocaleDateString()}
              extraText={buildDate.toLocaleTimeString()}
            />
        </AtList>
        <Back pageNum={2} />
      </View>
    );
  }
}