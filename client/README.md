这是一个练习demo

##config 配置目录

dev: 开发配置文件
index: 通用配置文件
prod: 打包配置文件

##src 源文件

components: 组件文件
pages: 页面文件
store: redux文件(后期添加)

app.less 全局样式
app.jsx 全局入口文件

.editorconfig 保持代码编写风格一致
.eslintrc ESlint配置文件
.gitignore 上传代码忽略文件

package.json 配置依赖文件

<!-- 添加自动生成页面模板 -->
(yarn || npm run) creatPage 页面名 生成标识(p || c) (指定文件夹下添加: 只包含pages里的文件)

示例：
  npm run creatPage homes p Home;
  yarn creatPage homes p Home;


生成的文件指定在: ./src/pages 下

