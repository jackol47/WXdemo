import Taro , { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import Dish from './dish/dish';
import Add from './add/add'

class DishItem extends Component {

    static defaultProps = {
        name: '',
        price: 0,
    }

    state = {
        count: 0,
        isShow: false
    }

    onDecrease = (newCount) => { 
        newCount--
        this.setState({count: newCount})
        if(newCount === 0){
          this.setState({ isShow: false })
        }
      }
    
      onIncrease = (newCount) => { 
        newCount++
        this.setState({count: newCount})
        if(newCount > 0){
          this.setState({ isShow: true })
        }
      }
    
    
  render() {
      const { isShow, count } = this.state
      const { name, price } = this.props
    return (
      <View style='position:relative'>
        <Dish 
          name={name}
          price={price}
        />
        <Add 
          isShow={isShow}
          count={count}
          onDecrease={() => this.onDecrease(count)}
          onIncrease={() => this.onIncrease(count)}
        />
      </View>
    );
  }
}
export default DishItem;