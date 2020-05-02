import Taro, { Component } from '@tarojs/taro';
import { View, Text, ScrollView, Button } from '@tarojs/components';
import One from '@/img/card.jpg'
import { AtList, AtListItem, AtFloatLayout, AtTextarea } from "taro-ui"

import './orderConfirm.less'


export default class OrderConfirm extends Component {
  state = {
    isOpen: false
  }

  onOpenClick = () => {
    this.setState(pre => ({ isOpen: !pre.isOpen}))
  }

  
  render() {

    return (
      <View>
        <ScrollView style='height: 1100rpx' scrollY>
          <Text className='orderedTitle'>已点菜品</Text>
          <AtList>
            <AtListItem
              title='鲜肉蒸饺'
              thumb={One}
              note={6 + '元'}
              extraText='x1'
            />
            <AtListItem
              title='鲜肉蒸饺'
              thumb={One}
              note={6 + '元'}
              extraText='x1'
            />
            <AtListItem
              title='鲜肉蒸饺'
              thumb={One}
              note={6 + '元'}
              extraText='x1'
            />
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
            <View className='btnItem' style='background-color: orangered' onClick={this.turnToOrderConfirmPage}>提交订单</View>
          </View>
        </View>

        <AtFloatLayout isOpened={this.state.isOpen}>
          <AtTextarea
            count={false}
            value={this.state.value}
            maxLength={200}
            height={300} />
          <Button className='confirm' onClick={this.onOpenClick}>
            确定
        </Button>
        </AtFloatLayout>
      </View>
    );
  }
}