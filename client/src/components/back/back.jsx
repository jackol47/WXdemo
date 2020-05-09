import Taro , { Component } from '@tarojs/taro';
import { Button } from '@tarojs/components';
import './back.less'

class Back extends Component {
    static defaultProps = {
        pageNum: 1
    }

    backToIndex = () => {
        Taro.navigateBack({
          delta: this.props.pageNum
        })
      }  
  render() {
    return (
      <Button className='back' onClick={this.backToIndex}>
        返回首页
      </Button>
    );
  }
}
export default Back;