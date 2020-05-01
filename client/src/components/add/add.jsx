import Taro , { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';

import './add.less'

export default class Add extends Component {
  render() {
    return (
      <View className='addBtn'>
        <View className='btn'>-</View>
        <Text className='quantity'>1</Text>
        <View className='btn'>+</View>
      </View>
    );
  }
}