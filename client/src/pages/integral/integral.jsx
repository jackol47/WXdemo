import Taro, { Component } from '@tarojs/taro';
import { View, Text, ScrollView } from '@tarojs/components';
import { AtAvatar } from 'taro-ui'
import { getDish, updatePoint, getUserInfo, exchange } from '@/utils/service'
import Commodity from '@/components/commodity/commodity';
import Back from '@/components/back/back';

import './integral.less'

export default class Integral extends Component {
  state = {
    nickName: "",
    avatarUrl: "",
    goodsList: [],
    interPoint: 0,
  }

  async componentDidMount() {
    const { avatarUrl, interPoint, nickName } = await getUserInfo()

    const { dishList } = await getDish()
    const goodsList = dishList.filter(item => item.type.indexOf('commodity') !== -1)
    this.setState({
      avatarUrl: avatarUrl,
      interPoint: interPoint,
      nickName: nickName,
      goodsList: goodsList
    })
  }


  // 计算剩余积分
  onHandleClick = (integral, commodityId, point) => {
    let points = point * 10
    if (integral >= points) {
      let remainder = integral - points
      this.setState({ interPoint: remainder })
      Taro.showToast({
        title: '兑换成功',
        icon: 'success',
        duration: 2000
      })
        .then(res => console.log(res))

      exchange(commodityId)
      console.log(commodityId);
      updatePoint(remainder)
    } else {
      Taro.showToast({
        title: '兑换失败，积分不足',
        icon: 'none',
        duration: 2000
      })
        .then(res => console.log(res))
    }
  }

  // 跳转到兑换记录
  turnToRecordPage = () => {
    Taro.navigateTo({
      url: '/pages/record/record'
    })
  }



  render() {
    const { nickName, avatarUrl, interPoint, goodsList } = this.state
    console.log({nickName,avatarUrl,interPoint});
    return (
      <View>

        <View className='user'>
          <AtAvatar size='large' style='margin-right: 40rpx' circle image={avatarUrl}></AtAvatar>
          <Text>{nickName}</Text>
          <Text>{`积分: ${interPoint}`}</Text>
          <View className='recordBtn' onClick={this.turnToRecordPage}>兑换记录 &gt;</View>
        </View>


        <ScrollView style='height: 910rpx' scrollY>
          {
            goodsList.map((item, index) => {
              return (
                <Commodity
                  key={index}
                  name={item.name}
                  point={item.price * 10}
                  img={item.img}
                  integral={interPoint}
                  onHandleClick={() => this.onHandleClick(interPoint, item.dish_id, item.price)}
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