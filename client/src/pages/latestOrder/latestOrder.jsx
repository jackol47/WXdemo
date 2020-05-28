import Taro , { Component } from '@tarojs/taro';
import { View, ScrollView } from '@tarojs/components';
import { AtList, AtListItem } from 'taro-ui'
import OrderList from '@/components/orderList/orderList'
import { getOrderForm, changeStatus } from '@/utils/service'
import Back from '@/components/back/back';

export default class LatestOrder extends Component {

  state = {
    latest: {},
    isPayed: false
  }

  async componentDidMount() {
    const { orderList } = await getOrderForm()
    
    const latest = orderList[orderList.length-1]
    const {status} = latest
    status === '已付款' && (this.setState({isPayed: true}), console.log(status))
    this.setState({latest: latest})
  }


  toPay = () => {
    changeStatus(this.state.latest.orderId)
    this.setState({isPayed: true})
    Taro.redirectTo({
      url: '/pages/successPay/successPay'
    })
  }

  render() {
    const { latest, isPayed } =this.state
    let buildDate = new Date(latest.buildDate)
    return (
      <View>
        <AtList>
          <ScrollView style='height: 530rpx' scrollY>
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
              note={buildDate.toLocaleDateString()}
              extraText={buildDate.toLocaleTimeString()}
            />
            {
              isPayed ?
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
        <Back pageNum={5} />
      </View>
    );
  }
}