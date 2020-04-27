import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { login } from '@/utils/service'
import Home from '../home/index'
import './index.less';

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: true,
      date: new Date()
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
    this.tick();

    login()
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  time() {
    console.log("哈哈哈哈哈哈")
  }

  renderHome = () => {
    const { isShow } = this.state;
    return (
      <View>
        {`isShow=${isShow}`}
      </View>
    )
  }

  render() {
    const { isShow } = this.state;
    return (
      <View>
        <Text>Hello, world!</Text>
        {isShow && (
          <View>
            <View onClick={this.time.bind(this)}>12345</View>
            <Text>现在的时间是 {this.state.date.toLocaleTimeString()}.</Text>
          </View>
        )}
        {this.renderHome()}
        <Home
          isShow={isShow}
          online={isShow}
        />
      </View>
    );
  }
}
