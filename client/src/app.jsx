import Taro, { Component } from '@tarojs/taro'
import 'taro-ui/dist/style/index.scss'
import Index from './pages/index/index'
import './app.less'


// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {
  

  componentDidMount () {
    if (process.env.TARO_ENV === 'weapp') {
      Taro.cloud.init()
    }
  }

  config = {
    pages: [
      'pages/index/index',
      'pages/menu/menu',
      'pages/recommend/recommend',
      'pages/orderConfirm/orderConfirm',
      'pages/success/success',
      'pages/latestOrder/latestOrder',
      'pages/integral/integral',
      'pages/record/record',
      'pages/history/history',
      'pages/orderDetails/orderDetails',
      'pages/successPay/successPay',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTextStyle: 'black'
    },
    cloud: true,
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
