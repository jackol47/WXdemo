import Taro, { Component } from '@tarojs/taro';
import { View, Text, Swiper, SwiperItem, Image, Button } from '@tarojs/components';
import { login } from '@/utils/service'
import SwOne from '@/img/sw1.jpg'
import SwTwo from '@/img/sw2.jpg'
import SwThree from '@/img/sw3.jpg'
import Order from '@/img/order.png'
import Integral from '@/img/integral.png'
import Home from '../home/index'

import './index.less';

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    login()
  }


  async componentDidMount() {
    const { uid } = await login()
    console.log("uid: ", uid)
    Taro.setStorageSync('uid', uid)
  }

  turnToMenuPage = () =>{
    Taro.navigateTo({
      url: '/pages/menu/menu'
    })
  }
  
  render() {
    return (
      <View>
        <Swiper
          className='swiper'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          circular
          indicatorDots
          autoplay>
          <SwiperItem>
            <Image src={SwOne} style='width: 100%' />
          </SwiperItem>
          <SwiperItem>
            <Image src={SwTwo} style='width: 100%' />
          </SwiperItem>
          <SwiperItem>
            <Image src={SwThree} style='width: 100%' />
          </SwiperItem>
        </Swiper>

        <Button className='startOrder' onClick={this.turnToMenuPage}>
          开始点餐
        </Button>

        <View className='content'>
          <View className='contentItem'>
            <Image src={Integral} style='width:50px;height: 50px' />
            <Text>积分商城</Text>
          </View>
          <View className='contentItem'>
            <Image src={Order} style='width:50px;height: 50px' />
            <Text>历史订单</Text>
          </View>
        </View>
      </View>
    );
  }
}
