import Taro , { Component } from '@tarojs/taro';
import { View, ScrollView } from '@tarojs/components';
import { AtList, AtListItem } from 'taro-ui'
import OrderList from '@/components/orderList/orderList'
import { getOrderForm } from '@/utils/service'
import Back from '@/components/back/back';

export default class LatestOrder extends Component {

  state = {
    latest: {}
  }

  async componentDidMount() {
    const { orderList } = await getOrderForm()
    
    const latest = orderList[orderList.length-1]
    this.setState({latest: latest})
  }
  

  render() {
    const { latest } =this.state
    console.log(latest);
    return (
      <View>
        <AtList>
          <ScrollView style='height: 630rpx' scrollY>
            <OrderList menuList={latest.menuList} />
          </ScrollView>
            <AtListItem 
              title='备注'
              extraText={latest.note}
            />
            <AtListItem 
              title='总价'
              extraText={`${latest.sumPrice}元`}
            />
            <AtListItem 
              title='订单号'
              extraText={latest.orderId}
            />
            <AtListItem 
              title='订单时间'
              note='05月04日'
              extraText='下午4:10'
            />
        </AtList>
        <Back pageNum={5} />
      </View>
    );
  }
}