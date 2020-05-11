import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtListItem } from "taro-ui"
// import { getOrderForm } from '@/utils/service'
// import One from '@/img/card.jpg'

class OrderList extends Component {
    static defaultProps = {
      menuList: []
    } 

    // async componentDidMount() {
    //     const data = await getOrderForm()
    //     const { orderList } = data
    //     let menuList = orderList[0].menuList
    //     this.setState({ menuList })
    // }

    render() {
        const { menuList } = this.props
        // console.log('menuList: ', menuList)
        return (
          <View>
            {
                menuList.map((item, index) => {
                return (
                    <AtListItem
                      key={index}
                      title={item.name}
                      thumb={item.img}
                      note={`${item.price}元`}
                      extraText={`x${item.count}`}
                    />
                )
                })
            }
          </View>
        );
    }
}
export default OrderList;