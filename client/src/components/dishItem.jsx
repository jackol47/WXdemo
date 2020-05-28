import Taro , { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import Dish from './dish/dish';
import Add from './add/add'

class DishItem extends Component {

    static defaultProps = {
        name: '',
        price: 0,
        img: '',
        cartList: [],
        dishId: '',
        
        onCountsChange: ()=>{}
    }

    state = {
      count: 0,
      isShow: false
    }


    onDecrease = (newCount) => { 
        newCount--
        // this.setState({count: newCount})
        this.setState({ count: newCount })
        if(newCount === 0){
          this.setState({ isShow: false })
          let index = this.props.cartList.findIndex(item => item.dishId === this.props.dishId)
          this.props.cartList.splice(index,1)
          // this.props.cartLength--
          this.props.onCountsChange(this.props.cartList)
        } else{
          this.addToCart(newCount)
        }
        
        // console.log('cartList', this.props.cartList);
      }
    
      onIncrease = (newCount) => { 
        newCount++
        this.setState({count: newCount})
        // this.props.count = newCount
        if(newCount > 0){
          this.setState({ isShow: true })
          this.addToCart(newCount)
        }

        // console.log('cartList', this.props.cartList);
      }
  
  addToCart = (newCount) => {
    if(this.props.cartList.some( item => item.dishId === this.props.dishId)){
      let current = this.props.cartList.findIndex(item => item.dishId === this.props.dishId)
      this.props.cartList[current].count = newCount
    } else {
      this.props.cartList.push({
        dishId: this.props.dishId,
        name: this.props.name,
        price: this.props.price,
        img: this.props.img,
        count: newCount
      })
      // this.props.cartLength++
      this.props.onCountsChange(this.props.cartList)
    }
  }    
    
  render() {
      const { isShow, count } = this.state
      const { name, price, img } = this.props
      
    return (
      <View style='position:relative'>
        <Dish 
          name={name}
          price={price}
          img={img}
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