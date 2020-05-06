const fs = require('fs');

const dirName = process.argv[2];

if (!dirName) {
  console.error('页面或模块名称不能为空');
  process.exit(0);
}

const genType = process.argv[3];
if (genType !== 'p' && genType !== 'c') {
  console.error('生成类型不能为空');
  process.exit(0);
}

// 页面文件模板
const pageTpl = `import Taro, { Component } from '@tarojs/taro';
import PropType from 'prop-types';
import { View } from '@tarojs/components;
import './index.less';

class Index extends Component {
    static defaultProps = {

    }

    constructor(props) {
      super(props);
      this.state = {
      };
    }

    componentDidMount() {

    }

    render() {
      return (
        <View>
          欢迎使用jackchen的模板
        <View>
      )
    }
}

Index.proptype = {
  name: PropType.string
}

export defalut Index
`;

const comTpl = `import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components;
import './${dirName}.less';

class ${dirName} extends Component {
    static defaultProps = {

    }

    constructor(props) {
      super(props);
      this.state = {
      };
    }

    render() {
      return (
        <View>
          欢迎使用jackchen的模板
        <View>
      )
    }
}

${dirName}.proptype = {
  name: PropType.string
}

export defalut ${dirName}
`

let parentDir = process.argv[4];
let boo = false;
if(parentDir) {
  boo = true
}

// 创建页面
if (genType === 'p') {
  if(boo) {
    if (!fs.existsSync(`./src/pages/${parentDir}`)) {
        fs.mkdirSync(`./src/pages/${parentDir}`)
    }
    fs.mkdirSync(`./src/pages/${parentDir}/${dirName}`)
    process.chdir(`./src/pages/${parentDir}/${dirName}`)
  } else {
    fs.mkdirSync(`./src/pages/${dirName}`)
    process.chdir(`./src/pages/${dirName}`)
  }

  fs.writeFileSync(`${dirName}.jsx`, pageTpl)
  fs.writeFileSync(`${dirName}.less`, '');
}

if(genType === 'c') {
    if(boo) {
        if(!fs.existsSync(`./src/pages/${parentDir}`)){
            fs.mkdirSync(`./src/pages/${parentDir}`)
        }

        fs.mkdirSync(`./src/pages/${parentDir}/${dirName}`)
        process.chdir(`./src/pages/${parentDir}/${dirName}`)
    } else {
        fs.mkdirSync(`./src/pages/${dirName}`)
        process.chdir(`./src/pages/${dirName}`)
    }

    fs.writeFileSync(`${dirName}.jsx`, comTpl)
    fs.writeFileSync(`${dirName}.less`, '')
}

console.log(`模版${dirName}已创建,请手动至app.tsx文件添加页面路径`)

process.exit(0);
