import Taro, { Component } from '@tarojs/taro';
import { View, Text, ScrollView, Button } from '@tarojs/components';
import { AtList, AtListItem, AtFloatLayout, AtTextarea } from "taro-ui"
import { getDish, submitOrder } from '@/utils/service'
import OrderList from '@/components/orderList/orderList'

import './orderConfirm.less'


export default class OrderConfirm extends Component {
  state = {
    isOpen: false
  }

  async componentDidMount() {

    const { dishList }= await getDish()
    let result = []
    result.push({dishId: dishList[0].dish_id, count: 1 })
    
    // this.submit(result, '多加la')
  }

  onOpenClick = () => {
    this.setState(pre => ({ isOpen: !pre.isOpen }))
  }

  submit = (menuIdLsit, note) => {
    submitOrder(menuIdLsit, note)
    Taro.navigateTo({
      url: '/pages/success/success'
    })
  }




  render() {
    return (
      <View>
        <ScrollView style='height: 1100rpx' scrollY>
          <Text className='orderedTitle'>已点菜品</Text>
          <AtList>
            <OrderList />
            <AtListItem className='note'
              title='备注'
              arrow='right'
              onClick={this.onOpenClick}
            />

          </AtList>
        </ScrollView>
        <View className='recBottom'>
          <Text className='total'>100元</Text>
          <View className='btnWrap'>
            <View className='btnItem' style='background-color: orangered' onClick={this.submit}>提交订单</View>
          </View>
        </View>

        <AtFloatLayout isOpened={this.state.isOpen}>
          <AtTextarea
            count={false}
            value={this.state.value}
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