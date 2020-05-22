import Taro , { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtList, AtListItem } from 'taro-ui'
import { getOrderForm } from '@/utils/service'

export default class History extends Component {

  state = {
      orderList: []
  }

  async componentDidMount() {
      const { orderList } = await getOrderForm()
      let reverOrderList = orderList.reverse()
      this.setState({orderList: reverOrderList})
  }

  more = (orderId) => {
      Taro.setStorage({
          key:'orderId',
          data: orderId
      })

      Taro.navigateTo({
        url: '/pages/orderDetails/orderDetails?id=1'
      })
  }

  render() {
      const { orderList } = this.state
      console.log(orderList);
    return (
      <View>
        <AtList>
          {
              orderList.map((item,index) => {
                  return (
                    <AtListItem
                      key={index}
                      title={new Date(item.buildDate).toLocaleDateString()}
                      note={new Date(item.buildDate).toLocaleTimeString()}
                      extraText={`实付${item.sumPrice}元`}
                      arrow='right'
                      onClick={() => {this.more(item.orderId)}}
                    />
                  )
              })
          }
        </AtList>
      </View>
    );
  }
}