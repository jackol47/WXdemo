import Taro, { Component } from '@tarojs/taro';
import { View, Text, ScrollView, Image } from '@tarojs/components';
import { AtList, AtListItem } from "taro-ui"
import One from '@/img/card.jpg'
import Add from '@/components/add/add'
import './recommend.less'


export default class Recommend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartList: []
    }
  }

  async componentDidMount() {
    Taro.getStorage({
      key: 'cart',
      success: (res) => {
        this.setState({
          cartList: res.data
        })
      }
    })
  }

  async componentDidUpdate() { 
    
  }

  

  onDecrease = (newCount, id) => { 
    --newCount
    if(newCount === 0){
      this.add(newCount, id)
      let index = this.state.cartList.findIndex(item => item.dishId === id)
      this.state.cartList.splice(index,1)
    } else{
      this.add(newCount, id)
    }
    
    console.log('cartList', this.state.cartList);
  }

  onIncrease = (newCount, id) => { 
    newCount++
    if(newCount > 0){
      this.add(newCount, id)
    }

    console.log('cartList', this.state.cartList);
  }

  add = (newCount, id) => {
      let current = this.state.cartList.findIndex(item => item.dishId === id)
      let newList = this.state.cartList
      newList[current].count = newCount
      this.setState({
        cartList: newList
      })
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

    const { cartList } = this.state
    console.log(cartList)

    return (
      <View>
        <ScrollView style='height: 1100rpx' scrollY>
          <View className='selectedMenu'>
            <Text className='selectedTitle'>已选以下菜品</Text>
            <AtList>
              {
                cartList.map((item, index) => {
                  return (
                    <View key={index} style='position: relative'>
                      <AtListItem  
                        title={item.name}
                        note={`${item.price}元`}
                        thumb={item.img}
                      />
                      <Add 
                        count={item.count} 
                        onDecrease={() => this.onDecrease(item.count, item.dishId)}
                        onIncrease={() => this.onIncrease(item.count, item.dishId)}
                      />
                    </View>
                      
                  )
                })
              }
            </AtList>
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
