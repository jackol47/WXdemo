import Taro , { Component } from '@tarojs/taro';
import { View, Text , Button,Image} from '@tarojs/components';
import Food from '@/img/shiwu.jpg'
import Add from '../add/add'

import './dish.less';

export default class Dish extends Component {

  render() {
    return (
      <View className='dishItem'>
        <Image src={Food} style='width:150px;heigt:150px' />
        <Text className='dishName'>酸辣土豆丝</Text>
        <Text className='price'>13</Text>
        <Add />
      </View>
    );
  }
}
