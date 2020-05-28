import Taro, { Component } from '@tarojs/taro';
import { Button } from '@tarojs/components';
import './back.less'

class Back extends Component {
  static defaultProps = {
    pageNum: 1,
    text: '返回首页'
  }

  backToIndex = () => {
    Taro.navigateBack({
      delta: this.props.pageNum
    })
  }
  
  render() {
    return (
      <Button className='back' onClick={this.backToIndex}>
        {this.props.text}
      </Button>
    );
  }
}
export default Back;