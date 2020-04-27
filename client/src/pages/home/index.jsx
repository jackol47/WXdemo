import Taro, { Component } from '@tarojs/taro';
import PropsTypes from 'prop-types';
import { View } from '@tarojs/components';

class Index extends Component {
  constructor(props) {
    super(props);
    const { isShow, online } = this.props;
    this.state = {
      isChecked: isShow,
      onLine: online
    };
  }

  onHandleClick = () => {
    this.setState({ isChecked: false });
  };

  render() {
    const { isChecked, onLine } = this.state;
    return <View onClick={this.onHandleClick}>{`${isChecked}, ${onLine}`}</View>;
  }
}

Index.defaultProps = {
  isShow: PropsTypes.bool,
  online: PropsTypes.bool
}

export default Index;
