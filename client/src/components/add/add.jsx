import Taro , { Component } from '@tarojs/taro';
import PropTypes from 'prop-types'
import { View, Text } from '@tarojs/components';

import './add.less'

class Add extends Component {
  static defaultProps = {
    count: 0,
    onDecrease: ()=>{},
    onIncrease: ()=>{}
  }

  render() {
    const { count, onDecrease, onIncrease } = this.props

    return (
      <View className='addBtn'>
        <View className='btn' onClick={onDecrease}>-</View>
        <Text className='quantity'>{count}</Text>
        <View className='btn' onClick={onIncrease}>+</View>
      </View>
    );
  }
}

Add.propTypes = {
  count: PropTypes.number,
  onDecrease: PropTypes.any,
  onIncrease: PropTypes.any
}

export default Add