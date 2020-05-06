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
    };
  }

  // 想要用户在加载页面之前首先授权登录，可是不会写
  // Page({
  //   data: {
  //     canIUse: Taro.canIUse('Button.open-type.getUserInfo')
  //   },
  //   onLoad: function () {
  //     Taro.getSetting({
  //       success(res) {
  //         if(!res.authSetting['scope.userInfo']) {
  //           Taro.authorize({
  //             scope: 'scope.userInfo',
              
  //             success (){
  //               Taro.getUserInfo()
  //             }
  //           })
  //         } else {
  //           Taro.getUserInfo({
  //             success: function() {
  //               console.log(res.userInfo)
  //             }
  //           })
  //         }
  //       }
  //     })
  //   }
  // })

  async componentDidMount() {
    
    
    const { uid } = await login()
    console.log("uid: ", uid)
    Taro.setStorageSync('uid', uid)
  }

  turnToMenuPage = () =>{
    Taro.navigateTo({
      url: '/pages/menu/menu?id=1'
    })
  }

  turnToIntegralPage = () =>{
    Taro.navigateTo({
      url: '/pages/integral/integral'
    })
  }
  
  render() {
    return (
      
      <View>
        {/* <Button open-type='getUserInfo'>授权登录</Button> */}
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
