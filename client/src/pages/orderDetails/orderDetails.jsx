import Taro , { Component } from '@tarojs/taro';
import { View, ScrollView } from '@tarojs/components';
import { AtList, AtListItem } from 'taro-ui'
import OrderList from '@/components/orderList/orderList'
import { getOrderForm, changeStatus } from '@/utils/service'
import Back from '@/components/back/back';

export default class OrderDetails extends Component {

  state = {
    orderId: '',
    orderItem: {},
    menuList: []
  }

  async componentDidMount() {
    const { orderList } = await getOrderForm()

    let storageOrderId
    await Taro.getStorage({
      key: 'orderId',
      success: (res) => {
        storageOrderId = res.data
      }
    })
    
    const orderItem = orderList.filter(item => item.orderId === storageOrderId)[0]
    const { menuList } = orderItem
    this.setState({
      orderId: storageOrderId,
      orderItem: orderItem,
      menuList: menuList,
    })
  }

  toPay = () => {
    changeStatus(this.state.orderId)
    Taro.redirectTo({
      url: '/pages/successPay/successPay'
    })
  }
  

  render() {
    const { orderId, orderItem, menuList } = this.state
    console.log('orderItem', orderItem);
    console.log('menuList', menuList);
    return (
      <View>
        <AtList>
          <ScrollView style='height: 530rpx' scrollY>
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
              title='下单时间'
              note={new Date(orderItem.buildDate).toLocaleDateString()}
              extraText={new Date(orderItem.buildDate).toLocaleTimeString()}
            />
            {
              orderItem.status === '已付款' ?
              <AtListItem 
                extraText='已付款'
              /> :
              <AtListItem 
                title='待付款'
                arrow='right'
                extraText='结账'
                onClick={this.toPay}
              />
            }
        </AtList>
        <Back pageNum={2} />
      </View>
    );
  }
}