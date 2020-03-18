import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Input, Icon, Button } from '@tarojs/components'
import One from '../../res/1.png'
import Two from '../../res/2.png'
import './index.less'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View>
        <View class='header'>
          <Icon></Icon>
          <Text>登录</Text>
        </View>

        <View class='main'>
          <Image src={One} mode='aspectFit'></Image>
          <Input type='text' placeholder='手机号/邮箱'></Input>
          <Image src={Two} mode='aspectFit'></Image>
          <Input type='password' placeholder='请输入密码'></Input>
        </View>

        <Button>登录</Button>
        <Button>注册</Button>
      </View>
    )
  }
}
