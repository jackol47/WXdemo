import Taro , { Component } from '@tarojs/taro';
import PropTypes from 'prop-types'
import { View, Text, Image} from '@tarojs/components';
import Food from '@/img/shiwu.jpg'

import './dish.less';

class Dish extends Component {
  static defaultProps = {
    img: Food,
    name: '',
    price: 0,
  }

  render() {
    const { img, name, price } = this.props
    return (
      <View className='dishItem'>
        <Image className='dishImg' src={img} />
        <View className='dishInner'>
          <Text className='dishName'>{name}</Text>
          <Text className='price'>{`${price}元`}</Text>
        </View>
      </View>
    );
  }
}

Dish.propTypes = {
  name: PropTypes.string,
  img: PropTypes.any,
  price: PropTypes.number,
}

export default Dish
