import Taro, { Component } from '@tarojs/taro';
import { View, Text, Swiper, SwiperItem, Image, Button } from '@tarojs/components';
import { login } from '@/utils/service'
import SwOne from '@/img/sw1.jpg'
import SwTwo from '@/img/sw2.jpg'
import SwThree from '@/img/sw3.jpg'
import Order from '@/img/order.png'
import Integral from '@/img/integral.png'
import './index.less';

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false
    };
  }

  turnToMenuPage = () => {
    Taro.navigateTo({
      url: '/pages/menu/menu?id=1'
    })
  }

  turnToIntegralPage = () => {
    Taro.navigateTo({
      url: '/pages/integral/integral?id=1'
    })
  }

  turnToHistorylPage = () => {
    Taro.navigateTo({
      url: '/pages/history/history?id=1'
    })
  }

  // 授权登录
  async handleGetUserInfo(e) {
    console.log(e.detail.userInfo)
    const { avatarUrl, nickName } = e.detail.userInfo
    const {uid} = await login(avatarUrl, nickName)
    this.setState(pre => ({ isLogin: !pre.isLogin }))
    Taro.setStorage({key: 'uid', data: uid})

    
  }

  render() {
    const { isLogin } = this.state
    return (

      <View>
        {
          !isLogin &&
          <Button className='loginBtn' onGetUserInfo={this.handleGetUserInfo} openType='getUserInfo'>授权登录</Button>
        }
        {
          isLogin &&
          <View>
            <Swiper
              className='swiper'
              indicatorColor='#999'
              indicatorActiveColor='#333'
              circular
              indicatorDots
              autoplay
            >
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
              <View className='contentItem' onClick={this.turnToIntegralPage}>
                <Image src={Integral} style='width:50px;height: 50px' />
                <Text>积分兑换</Text>
              </View>
              <View className='contentItem' onClick={this.turnToHistorylPage}>
                <Image src={Order} style='width:50px;height: 50px' />
                <Text>历史订单</Text>
              </View>
            </View>
          </View>
        }

      </View>
    );
  }
}
