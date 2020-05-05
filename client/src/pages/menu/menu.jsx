import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
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
      dishList: []
    }
  }


  async componentDidMount() {
    const { dishList } = await getDish()
    this.setState({ dishList })
    
  }

  handleClick (value) {
    this.setState({
      current: value
    })
  }

  turnToRecommendPage = () => {
    Taro.navigateTo({
      url: '/pages/recommend/recommend?id=1'
    })
  }

  

  render() {
    const { dishList } = this.state
    console.log('dishList: ', dishList);

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
                      item.type === 'fry' &&
                      <DishItem
                        name={item.name}
                        price={item.price}
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
                      item.type === 'fry' &&
                      <DishItem
                        name={item.name}
                        price={item.price}
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
                      item.type === 'fry' &&
                      <DishItem
                        name={item.name}
                        price={item.price}
                      />
  
                    }
                  </View>
                )
              })
            }
          </AtTabsPane>
        </AtTabs>

        <View className='menuBottom'>
          <View className='cart'>
            <Image src={Cart} style='width:100rpx;height:100rpx;' />
          </View>
          <View className='selectOver' onClick={this.turnToRecommendPage}>选好了</View>
        </View>
      </View>
    );
  }
}