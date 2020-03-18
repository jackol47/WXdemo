import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Input, Icon, Button } from '@tarojs/components'
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
          <Image src='../../res/1.png' mode='aspectFit'></Image>
          <Input type='text' placeholder='手机号/邮箱'></Input>
          <Image src='../../res/2.png' mode='aspectFit'></Image>
          <Input type='password' placeholder='请输入密码'></Input>
        </View>

        <Button>登录</Button>
        <Button>注册</Button>
      </View>
    )
  }
}
