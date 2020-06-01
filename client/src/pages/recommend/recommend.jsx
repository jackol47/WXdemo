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
      sumPrice: 0
    }
  }

  async componentDidMount() {
    console.time('生成推荐菜单耗费时间')
    // 获取到当前用户点的购物车菜单列表
    let cartList
    await Taro.getStorage({
      key: 'cart',
      success: (res) => {
        cartList = res.data
        this.setState({ cartList: cartList })
      }
    })

    const { dishList } = await getDish()

    // 得到欲推荐的菜单
    let toRecList = this.filterUnSelecDish(dishList, cartList)
    console.log('toRecList', toRecList);

    // 构造随机数组
    let randomArr = this.buildRandom(toRecList)
    
    // 生成推荐菜单
    let recList = this.getRecList(randomArr, toRecList)
    console.timeEnd('生成推荐菜单耗费时间')
    // 设置状态
    this.setState({
      recList: recList
    })

    // 计算总价
    this.summary() 
  }

  // 筛选方法
  filterUnSelecDish = (dishList, cartList) => {

    // 判断购物车是否为空
    if(cartList.length === 0){
      return dishList.filter(item => item.type.indexOf('other'))
    }

    // 筛选未选择的菜品
    dishList.forEach(item => {
      cartList.forEach(cartItem => {
        if (item.dish_id === cartItem.dishId) {
          item.isSelected = true
        } else {
          if (!item.isSelected) {
            item.isSelected = false
          }
        }
      })
    })

    let typeArr = []
    let unSelectList = dishList.reduce((list, item) => {
      !item.isSelected ? list.push(item) : (!typeArr.includes(item.type) && typeArr.push(item.type))
      return list
    }, [])

    // 筛选出用户选择的菜品对应的未选菜品
    let unSelectTypeList = []
    typeArr.forEach(type => {
      unSelectTypeList.push(...unSelectList.filter(item => item.type === type))
    })

    return unSelectTypeList
  }

  // 随机数组构造方法
  buildRandom = list => {
    let random = []
    let unsLength = list.length
    let k = 0
    unsLength > 9 ? k = 9 : k = unsLength
    for (let i = 0; i < k; i++) {
      let j = Math.floor(Math.random() * unsLength)
      if (!random.includes(j)) {
        random.push(j)
      } else{
        i--
      }
    }

    return random
  }

  // 推荐菜单生成方法
  getRecList = (array, list) => {
    let recList = []
    let rLenght = array.length
    for (let i = 0; i < rLenght; i++) {

      recList.push(list[array[i]])

    }

    return recList
  }

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

    const { cartList, sumPrice, recList } = this.state


    return (
      <View>
        <ScrollView style='height: 1100rpx' scrollY>

          {
            cartList.length === 0 &&
            <View className='emptyHint'>您的购物车还是空的！</View>
          }
          {
            cartList.length !== 0 &&
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
          }


          <View className='recommend'>
            <Text className='recTitle'>为您推荐</Text>
            <View className='reclist'>
              {
                recList.map((item, index) => {
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
