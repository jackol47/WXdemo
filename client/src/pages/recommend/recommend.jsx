import Taro, { Component } from '@tarojs/taro';
import { View, Text, ScrollView, Image } from '@tarojs/components';
import { AtList, AtListItem } from "taro-ui"
import Add from '@/components/add/add'
import { getDish } from '@/utils/service'
import './recommend.less'


export default class Recommend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartList: [],
      recList: [],
      random: [],
      sumPrice: 0
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

    const { dishList } = await getDish()

    let recList = []
    this.state.cartList.forEach(cartItem => {
      dishList.forEach(item => {
        if (item.dish_id !== cartItem.dishId) {
          recList.push(item)
        }
      })
    })
    this.setState({ recList: recList })
    let random = []
    for (let i = 0; i < 9; i++) {
      let j = Math.floor(Math.random() * recList.length)
      if (!random.includes(j)) {
        random.push(j)
      }
    }
    this.setState({
      recList: recList,
      random: random
    })
    this.summary()
  }

  // async componentDidUpdate() {
  // }



  onDecrease = (newCount, id) => {
    --newCount
    if (newCount === 0) {
      this.add(newCount, id)
      let index = this.state.cartList.findIndex(item => item.dishId === id)
      this.state.cartList.splice(index, 1)
    } else {
      this.add(newCount, id)
    }

    this.summary()
  }

  onIncrease = (newCount, id) => {
    newCount++
    if (newCount > 0) {
      this.add(newCount, id)
    }

    this.summary()
  }

  add = (newCount, id) => {
    let current = this.state.cartList.findIndex(item => item.dishId === id)
    let newList = this.state.cartList
    newList[current].count = newCount
    this.setState({
      cartList: newList
    })
  }

  addToCart = (dishId, name, price, img) => {
    let newList = this.state.cartList
    if (this.state.cartList.some(item => item.dishId === dishId)) {

    } else {
      newList.push({
        dishId: dishId,
        name: name,
        price: price,
        img: img,
        count: 1
      })
    }
    this.setState({ cartList: newList })
    this.summary()

  }

  summary = () => {
    let sum = this.state.cartList.reduce((pre, cur) => {
      return pre + cur.price * cur.count
    }, 0);
    this.setState({ sumPrice: sum })
  }



  backToMenuPage = () => {
    Taro.navigateBack({
      delta: 1
    })
  }

  readyToOrder = () => {
    Taro.setStorage({
      key: 'cart',
      data: this.state.cartList
    })

    Taro.navigateTo({
      url: '/pages/orderConfirm/orderConfirm?id=1'
    })
  }

  render() {

    const { cartList, sumPrice, recList, random } = this.state

    let recRandom = []
    for (let i = 0; i < random.length; i++) {

      recRandom.push(recList[i])

    }
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
              {
                recRandom.map((item, index) => {
                  return (
                    <View className='recItem' key={index}>
                      <Image src={item.img} className='recImg' />
                      <View style='font-size: 24rpx'>{item.name}</View>
                      <View style='font-size: 24rpx'>{`${item.price}元`}</View>
                      <View className='addToCart' onClick={() => this.addToCart(item.dish_id, item.name, item.price, item.img)}>加入购物车</View>
                    </View>
                  )
                })
              }

            </View>
          </View>

        </ScrollView>
        <View className='recBottom'>
          <Text className='total'>{`${sumPrice}元`}</Text>
          <View className='btnWrap'>
            <View className='btnItem' style='background-color: orange' onClick={this.backToMenuPage}>继续点菜</View>
            <View className='btnItem' style='background-color: red' onClick={this.readyToOrder}>去下单</View>
          </View>
        </View>
      </View>
    );
  }
}
