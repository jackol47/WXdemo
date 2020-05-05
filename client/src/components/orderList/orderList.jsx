import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtListItem } from "taro-ui"
import { getOrderForm } from '@/utils/service'
import One from '@/img/card.jpg'

class OrderList extends Component {
    state = {
        menuList: []
    }

    async componentDidMount() {
        const data = await getOrderForm()
        const { orderList } = data
        let menuList = orderList[0].menuList
        this.setState({ menuList })
    }

    render() {
        const { menuList } = this.state
        console.log('menuList: ', menuList)
        return (
          <View>
            {
                menuList.map((item, index) => {
                return (
                    <AtListItem
                      key={index}
                      title={item.name}
                      thumb={One}
                      note={item.price + '元'}
                      extraText={item.count}
                    />
                )
                })
            }
          </View>
        );
    }
}
export default OrderList;