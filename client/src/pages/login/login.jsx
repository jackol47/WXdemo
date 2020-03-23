import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Input, Icon, Button } from '@tarojs/components'
import One from '../../res/1.png'
import Two from '../../res/2.png'
import Three from '../../res/3.png'
import './login.less'

export default class Index extends Component {
  config = {
    
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
        <View class='rapidLogin'>
          <Text class='rapid'>
            快捷登录
          </Text>
        </View>
        <View class='weChat'>
          <Image src={Three} mode='aspectFit'></Image>
        </View>
      </View>
      
    )
  }
}


