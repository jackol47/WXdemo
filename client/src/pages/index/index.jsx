import Taro , { Component } from '@tarojs/taro';
import { View, Text, Image} from '@tarojs/components';
import One from '../../res/1.jpg'
import WriteIn from '../../res/luru-xianxing.png'
import Check from '../../res/chayue.png'
import Type from '../../res/leimupinleifenleileibie.png'
import Search from '../../res/jiansuo.png'
import './index.less'



export default class Index extends Component {
  constructor(props) {
    super(props)
  }

  turnLoginPage = () => {
    Taro.navigateTo({ url: '/pages/login/login' });
  }

  render() {
    return (
      <View>
        <Image src={One} mode='aspectFit' class='topImage'></Image>
        <View class='flex'>
            <View class='flexItem' onClick={this.turnLoginPage}>
                <Image src={WriteIn} class='icon'></Image>
                <Text>档案录入</Text>
            </View>
            <View class='flexItem'>
                <Image src={Check} class='icon'></Image>
                <Text>档案查阅</Text>
            </View>
            <View class='flexItem'>
                <Image src={Type} class='icon'></Image>
                <Text>档案分类</Text>
            </View>
            <View class='flexItem'>
                <Image src={Search} class='icon'></Image>
                <Text>档案检索</Text>
            </View>
        </View>
      </View>
    );
  }

}
