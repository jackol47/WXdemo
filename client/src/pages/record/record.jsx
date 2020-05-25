import Taro , { Component } from '@tarojs/taro';
import { ScrollView } from '@tarojs/components';
import { AtList, AtListItem } from 'taro-ui'
import { getRecord } from '@/utils/service'
import './record.less'

export default class Record extends Component {

  state = {
    recordList: []
  }

  async componentDidMount() {
      const { recordList } = await getRecord()
      this.setState({recordList: recordList.reverse()})
  }
  render() {
    const { recordList } = this.state
    return (
      <ScrollView scrollY style='height:1200rpx'>
        <AtList>
            {
                recordList.map((item, index) => {
                    return (
                        <AtListItem 
                          key={index}
                          title={item.name}
                          thumb={item.img}
                          note={new Date(item.buildDate).toLocaleString()}
                          extraText={`扣除积分${item.integral}`}
                        />
                    )
                })
            }
            
        </AtList>
      </ScrollView>
    );
  }
}
