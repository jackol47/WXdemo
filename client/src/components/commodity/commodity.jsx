import Taro , { Component } from '@tarojs/taro';
import { View, Text , Image } from '@tarojs/components';
import './commodity.less'

class Commodity extends Component {
    static defaultProps = {
        img: '',
        name: '',
        point: 0,
        integral: 0,
        onHandleClick: ()=>{}
    }

    state = {
      exchanged: false
    }

    

    exchangeClick = () => {
      if(this.props.integral >= this.props.point){
        this.setState({exchanged: true})

      }
      this.props.onHandleClick()
    }
  
  
  render() {
    const { img, name, point } = this.props
    const { exchanged } = this.state
    return (
      <View className='goodsWrap'>
        <Image className='goodImg' src={img} />
        <Text className='goodName'>{name}</Text>
        <Text className='point'>{`${point}积分`}</Text>
        <View className='exchange' onClick={this.exchangeClick}>
          {!exchanged && <Text>兑 换</Text>}
          {exchanged && <Text className='exchanged'>已兑换</Text>}
        </View>
      </View>
    );
  }
}
export default Commodity;