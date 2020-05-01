import Taro, { Component } from '@tarojs/taro';
import { View, Text, Button, ScrollView } from '@tarojs/components';

export default class Menu extends Component {
  constructor() {
    super(...arguments)
  }

  turnToRecommendPage = () => {
    Taro.navigateTo({
      url: '/pages/recommend/recommend'
    })
  }

  onScrollToUpper = () => { }

  onScroll(e) {
    console.log(e.detail);
  }

  render() {
    const scrollStyle = {
      height: '150px'
    }

    const scrollTop = 0
    const Threshold = 20
    const vStyleA = {
      height: '150px',
      'background-color': 'rgb(26, 173, 25)'
    }
    const vStyleB = {
      height: '150px',
      'background-color': 'rgb(39,130,215)',
      color: '#333'
    }
    const vStyleC = {
      height: '150px',
      'background-color': 'rgb(241,241,241)',
      color: '#333'
    }
    return (
      <View>
        <ScrollView
          className='scollView'
          scrollY
          scrollWithAnimation
          scrollTop={scrollTop}
          style={scrollStyle}
          lowerThreshold={Threshold}
          upperThreshold={Threshold}
          onScrollToUpper={this.onScrollToUpper}
          roll={this.onScroll}
        >
          <View style={vStyleA}>A</View>
          <View style={vStyleB}>B</View>
          <View style={vStyleC}>C</View>
        </ScrollView>
        <Button onClick={this.turnToRecommendPage}>选好了</Button>
      </View>
    );
  }
}