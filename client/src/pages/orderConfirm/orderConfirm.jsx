import Taro, { Component } from '@tarojs/taro';
import { View, Text, ScrollView, Button } from '@tarojs/components';
import { AtList, AtListItem, AtFloatLayout, AtTextarea } from "taro-ui"
import { submitOrder } from '@/utils/service'
import OrderList from '@/components/orderList/orderList'

import './orderConfirm.less'


export default class OrderConfirm extends Component {
  state = {
    isOpen: false,
    orderList: [],
    value: ''
  }
  

  async componentDidMount() {

    // const { dishList }= await getDish()
    // let result = []
    // result.push({dishId: dishList[0].dish_id, count: 1 })

    Taro.getStorage({
      key: 'cart',
      success: (res) => {
        this.setState({
          orderList: res.data
        })
      }
    })

    
    
    // this.submit(result, '多加la')
  }

  // componentDidUpdate() { }

  onOpenClick = () => {
    this.setState(pre => ({ isOpen: !pre.isOpen }))
  }

  handleChange (value) {
    this.setState({
      value
    })
  }

  submit = (menuIdLsit, note) => {
    submitOrder(menuIdLsit, note)
    Taro.navigateTo({
      url: '/pages/success/success?id=1'
    })
  }




  render() {
    const { orderList } = this.state
    let sum = orderList.reduce((pre, cur) => {
      return pre + cur.price * cur.count
    }, 0);
    console.log(sum);
    return (
      <View>
        <ScrollView style='height: 1100rpx' scrollY>
          <Text className='orderedTitle'>已点菜品</Text>
          <AtList>
            <OrderList menuList={orderList} />
            <AtListItem className='note'
              title='备注'
              extraText={this.state.value}
              arrow='right'
              onClick={this.onOpenClick}
            />

          </AtList>
        </ScrollView>
        <View className='recBottom'>
          <Text className='total'>{`${sum}元`}</Text>
          <View className='btnWrap'>
            <View className='btnItem' style='background-color: orangered' onClick={() => this.submit(this.state.orderList, this.state.value)}>提交订单</View>
          </View>
        </View>

        <AtFloatLayout isOpened={this.state.isOpen}>
          <AtTextarea
            count={false}
            value={this.state.value}
            onChange={this.handleChange.bind(this)}
            maxLength={200}
            height={300} 
          />
          <Button className='confirm' onClick={this.onOpenClick}>
            确定
        </Button>
        </AtFloatLayout>
      </View>
    );
  }
}