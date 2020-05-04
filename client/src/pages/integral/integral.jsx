import Taro , { Component } from '@tarojs/taro';
import { View, Text, ScrollView } from '@tarojs/components';
import { AtAvatar } from 'taro-ui'
import Food from '@/img/shiwu.jpg'
import Dish from '@/components/dish/dish';
import './integral.less'

export default class Integral extends Component {
    state = {
        nickName : "",
        avatarUrl: ""
    }

    async componentDidMount(){
        Taro.getUserInfo({
            success: function(res) {
                const userInfo = res.userInfo
                this.setState({nickName: userInfo.nickName, avatarUrl: userInfo.avatarUrl})
            }
        })
        
    }
    

  
  render() {
    const { nickName, avatarUrl } = this.state
    return (
      <View>
        <View className='user'>
            <AtAvatar circle image={avatarUrl}></AtAvatar>
            <Text>{nickName}</Text>
            <Text>0</Text>
        </View>
        <ScrollView className='extraList' scrollY>
            <View style='position: relative'>
              <Dish
                img={Food}
                name='章泽仪'
                price={200}
              />
              <View className='exchange'>兑 换</View>

            </View>
        </ScrollView>

      </View>
    );
  }
}