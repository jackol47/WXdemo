import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import { AtTabs, AtTabsPane } from 'taro-ui'
import Cart from '@/img/cart.png'
import { getDish } from '@/utils/service'
import DishItem from '@/components/dishItem'
import './menu.less'

export default class Menu extends Component {

  constructor () {
    super(...arguments)
    this.state = {
      current: 0,
      dishList: [],
      cartList: [],
      display: false,
      cartLength: 0
    }
  }


  async componentDidMount() {
    const { dishList } = await getDish()
    this.setState({ dishList })
    this.setState({cartLength: this.state.cartList.length})
  }

  async componentDidUpdate() { }

  handleClick (value) {
    this.setState({
      current: value
    })
  }

  turnToRecommendPage = () => {
    Taro.setStorage({
      key:'cart',
      data: this.state.cartList
    })
    Taro.navigateTo({
      url: '/pages/recommend/recommend?id=1'
    })
  }

  displayClick = () =>{
    this.setState(pre => ({ display: !pre.display }))
  }

  onCountsChange = (list) => {
    this.setState({cartLength: list.length})
  }

  

  render() {
    const { dishList, cartList, display, cartLength } = this.state
    // console.log('dishList: ', dishList);
    // console.log('cartList', cartList);
    
    return (
      <View>
        <AtTabs
          current={this.state.current}
          scroll
          height='1080rpx'
          tabDirection='vertical'
          tabList={[
            { title: '家常小炒' },
            { title: '河海鲜类' },
            { title: '水煮类' },
            { title: '汤类' },
            { title: '酒水饮料' },
            { title: '其他' }
          ]}
          onClick={this.handleClick.bind(this)}
        >
          <AtTabsPane tabDirection='vertical' current={this.state.current} index={0}>
            <View className='typeTitle'>家常小炒类</View>
            {
              dishList.map((item, index) => {
                return (
                  <View key={index}>
                    {
                      item.type === 'fry' &&
                      <DishItem
                        name={item.name}
                        price={item.price}
                        img={item.img}
                        cartList={cartList}
                        dishId={item.dish_id}
                        onCountsChange={() => this.onCountsChange(cartList)}
                      />
  
                    }
                  </View>
                )
              })
            }
          </AtTabsPane>
          <AtTabsPane tabDirection='vertical' current={this.state.current} index={1}>
            <View className='typeTitle'>河海鲜类</View>
            {
              dishList.map((item, index) => {
                return (
                  <View key={index}>
                    {
                      item.type === 'seafood' &&
                      <DishItem
                        name={item.name}
                        price={item.price}
                        img={item.img}
                        cartList={cartList}
                        dishId={item.dish_id}
                        onCountsChange={() => this.onCountsChange(cartList)}
                      />
  
                    }
                  </View>
                )
              })
            }
          </AtTabsPane>
          <AtTabsPane tabDirection='vertical' current={this.state.current} index={2}>
            <View className='typeTitle'>水煮类</View>
            {
              dishList.map((item, index) => {
                return (
                  <View key={index}>
                    {
                      item.type === 'poach' &&
                      <DishItem
                        name={item.name}
                        price={item.price}
                        img={item.img}
                        cartList={cartList}
                        dishId={item.dish_id}
                        onCountsChange={() => this.onCountsChange(cartList)}
                      />
  
                    }
                  </View>
                )
              })
            }
          </AtTabsPane>
          <AtTabsPane tabDirection='vertical' current={this.state.current} index={3}>
            <View className='typeTitle'>汤类</View>
            {
              dishList.map((item, index) => {
                return (
                  <View key={index}>
                    {
                      item.type === 'soup' &&
                      <DishItem
                        name={item.name}
                        price={item.price}
                        img={item.img}
                        cartList={cartList}
                        dishId={item.dish_id}
                        onCountsChange={() => this.onCountsChange(cartList)}
                      />
  
                    }
                  </View>
                )
              })
            }
          </AtTabsPane>
          <AtTabsPane tabDirection='vertical' current={this.state.current} index={4}>
            <View className='typeTitle'>酒水饮料</View>
            {
              dishList.map((item, index) => {
                return (
                  <View key={index}>
                    {
                      item.type.indexOf('drink') !== -1 &&
                      <DishItem
                        name={item.name}
                        price={item.price}
                        img={item.img}
                        cartList={cartList}
                        dishId={item.dish_id}
                        onCountsChange={() => this.onCountsChange(cartList)}
                      />
  
                    }
                  </View>
                )
              })
            }
          </AtTabsPane>
          <AtTabsPane tabDirection='vertical' current={this.state.current} index={5}>
            <View className='typeTitle'>其他</View>
            {
              dishList.map((item, index) => {
                return (
                  <View key={index}>
                    {
                      item.type.indexOf('other') !== -1 &&
                      <DishItem
                        name={item.name}
                        price={item.price}
                        img={item.img}
                        cartList={cartList}
                        dishId={item.dish_id}
                        onCountsChange={() => this.onCountsChange(cartList)}
                      />
  
                    }
                  </View>
                )
              })
            }
          </AtTabsPane>
        </AtTabs>

        <View className='menuBottom'>
          <View className='cart' onClick={this.displayClick}>
            <Image src={Cart} style='width:100rpx;height:100rpx;' />
            <Text className='dishCount'>{cartLength}</Text>
          </View>
          <View className='selectOver' onClick={this.turnToRecommendPage}>选好了</View>
          {display && <View className='cartList'>
            {
              cartList.map((item, index) => {
                return (
                  <View className='cartItem' key={index}>
                    <Text style='float:left'>{item.name}</Text>
                    <Text style='float:right;margin-left:200rpx'>{`x${item.count}`}</Text>
                    <Text style='float:right'>{`${item.price}元`}</Text>
                  </View>
                )
              })
            }
          </View>}
        </View>
      </View>
    );
  }
}