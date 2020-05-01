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
    };
  }

  componentDidMount() {
    login()
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
