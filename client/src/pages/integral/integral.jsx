import Taro , { Component } from '@tarojs/taro';
import { View, Text, ScrollView } from '@tarojs/components';
import { AtAvatar } from 'taro-ui'
import { getDish, getOrderForm } from '@/utils/service'
import Commodity from '@/components/commodity/commodity';
import Back from '@/components/back/back';

import './integral.less'

export default class Integral extends Component {
    state = {
        nickName : "",
        avatarUrl: "",
        goodsList: [],
        integral: 0
    }

    async componentDidMount(){
        Taro.getUserInfo({
            success: function(res) {
                const userInfo = res.userInfo
                this.setState({nickName: userInfo.nickName, avatarUrl: userInfo.avatarUrl})
            }
        })

        const { orderList } = await getOrderForm() 
        const integral = orderList.reduce((pre, cur) => pre + cur.sumPrice, 0)
        
        const { dishList } = await getDish()
        const goodsList = dishList.filter(item => item.type === 'commodity')
        this.setState({
          integral: integral,
          goodsList: goodsList
        })
    }

    // componentDidUpdate() { }

    onHandleClick = (integral, point) => {
      let points = point * 10
      if(integral >= points){
        let remainder = integral - points
        this.setState({integral: remainder})
        Taro.showToast({
          title: '兑换成功',
          icon: 'success',
          duration: 2000
        })
          .then(res => console.log(res))

      } else{
        Taro.showToast({
          title: '兑换失败，积分不足',
          icon: 'none',
          duration: 2000
        })
          .then(res => console.log(res))
      }
    }
    

  
  render() {
    const { nickName, avatarUrl, integral, goodsList } = this.state
    return (
      <View>
        <View className='user'>
            <AtAvatar circle image={avatarUrl}></AtAvatar>
            <Text>{nickName}</Text>
            <Text>{`积分: ${integral}`}</Text>
        </View>
        <ScrollView style='height: 1000rpx' scrollY>
            {
              goodsList.map((item, index) => {
                return (
                  <Commodity
                    key={index}
                    name={item.name}
                    point={item.price * 10}
                    img={item.img}
                    integral={integral}
                    onHandleClick={() => this.onHandleClick(integral, item.price)}
                  />
                )
              })
            }
        </ScrollView>
        <Back pageNum={1} />
      </View>
    );
  }
}