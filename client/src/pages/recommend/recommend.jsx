import Taro, { Component } from '@tarojs/taro';
import { View, Text, ScrollView, Image } from '@tarojs/components';
import One from '@/img/card.jpg'
// import { AtList, AtListItem } from "taro-ui"
import Food from '@/img/shiwu.jpg'
import Dish from '@/components/dish/dish'
import Add from '@/components/add/add'
import './recommend.less'


export default class Recommend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
    }
  }

  onDecrease = (newCount) => { 
    newCount--
    this.setState({count: newCount})
  }

  onIncrease = (newCount) => { 
    newCount++
    this.setState({count: newCount})
  }

  backToMenuPage = () =>{
    Taro.navigateBack({
      delta: 1
    })
  }

  turnToOrderConfirmPage = () => {
    Taro.navigateTo({
      url: '/pages/orderConfirm/orderConfirm'
    })
  }

  render() {

    const { count } = this.state

    return (
      <View>
        <ScrollView style='height: 1100rpx' scrollY>
          <View className='selectedMenu'>
            <Text className='selectedTitle'>已选以下菜品</Text>
            {/* {menuList.map(item => {
              return item && {<View></View>}
            })} */}
            {<View className='dishWrap'>
              <Dish
                img={Food}
                name='asduhaukd'
                price={100}
              />
              <Add
                count={count}
                onDecrease={() => this.onDecrease(count)}
                onIncrease={() => this.onIncrease(count)}
              />
            </View>}
            <View className='dishWrap'>
              <Dish
                img={Food}
                name='asduhaukd'
                price={100}
              />
              <Add
                count={count}
                onDecrease={() => this.onDecrease(count)}
                onIncrease={() => this.onIncrease(count)}
              />
            </View>
          </View>
          <View className='recommend'>
            <Text className='recTitle'>为您推荐</Text>
            <View className='reclist'>
              <View className='recItem'>
                <Image src={One} className='recImg' />
                <View style='font-size: 24rpx'>菜名</View>
                <View style='font-size: 24rpx'>价格</View>
                <View className='addToCart'>加入购物车</View>
              </View>
              <View className='recItem'>
                <Image src={One} className='recImg' />
                <View style='font-size: 24rpx'>菜名</View>
                <View style='font-size: 24rpx'>价格</View>
                <View className='addToCart'>加入购物车</View>
              </View>
              <View className='recItem'>
                <Image src={One} className='recImg' />
                <View style='font-size: 24rpx'>菜名</View>
                <View style='font-size: 24rpx'>价格</View>
                <View className='addToCart'>加入购物车</View>
              </View>
              <View className='recItem'>
                <Image src={One} className='recImg' />
                <View style='font-size: 24rpx'>菜名</View>
                <View style='font-size: 24rpx'>价格</View>
                <View className='addToCart'>加入购物车</View>
              </View>
              <View className='recItem'>
                <Image src={One} className='recImg' />
                <View style='font-size: 24rpx'>菜名</View>
                <View style='font-size: 24rpx'>价格</View>
                <View className='addToCart'>加入购物车</View>
              </View>
              <View className='recItem'>
                <Image src={One} className='recImg' />
                <View style='font-size: 24rpx'>菜名</View>
                <View style='font-size: 24rpx'>价格</View>
                <View className='addToCart'>加入购物车</View>
              </View>
              <View className='recItem'>
                <Image src={One} className='recImg' />
                <View style='font-size: 24rpx'>菜名</View>
                <View style='font-size: 24rpx'>价格</View>
                <View className='addToCart'>加入购物车</View>
              </View>
              <View className='recItem'>
                <Image src={One} className='recImg' />
                <View style='font-size: 24rpx'>菜名</View>
                <View style='font-size: 24rpx'>价格</View>
                <View className='addToCart'>加入购物车</View>
              </View>
              <View className='recItem'>
                <Image src={One} className='recImg' />
                <View style='font-size: 24rpx'>菜名</View>
                <View style='font-size: 24rpx'>价格</View>
                <View className='addToCart'>加入购物车</View>
              </View>
            </View>
          </View>

        </ScrollView>
        <View className='recBottom'>
          <Text className='total'>100元</Text>
          <View className='btnWrap'>
            <View className='btnItem' style='background-color: orange' onClick={this.backToMenuPage}>继续点菜</View>
            <View className='btnItem' style='background-color: red' onClick={this.turnToOrderConfirmPage}>去下单</View>
          </View>
        </View>
      </View>
    );
  }
}
