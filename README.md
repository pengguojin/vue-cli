# vue-cli构建的工程
该工程主要是自己学习的时候用来记录的，使用了vue-cli构建，bootstrap-vue做UI，欢迎下载，欢迎fork

#### 项目介绍(文件夹说明)
- 1、学习记录           
    参考链接：[学习记录](https://gitee.com/pengguojin/vuecli.git)
- 2、vue-36kr是仿36kr网站做的工程       
    参考链接：[vue-36kr工程](https://gitee.com/pengguojin/vuecli.git)
#### 软件架构
- 1、vue-36kr架构 
    -  后台使用koa和koa-router搭建的服务器
    -  前台使用vue-cli构建，使用vuex管理全局状态

#### 安装教程
- vue-36kr工程：
1. 命令行进入vue-36kr/koa文件夹，执行命令npm i安装依赖包
2. 然后执行命令node server.js，让后台跑起来
2. 命令行进入vue-36kr/vue文件夹，执行命令npm i安装依赖包
3. 然后执行命令npm start，让前台跑起来

#### 使用说明

# bootstrap-vue
bootstrap-vue基于bootstrap4的，具体的可以参考bootstrap4的样式
## 在vue-cli中如何使用？
1、安装模块```npm i bootstrap-vue -S```
2、在mian.js引入即可，非常简单，如下
```javascript
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
// bootstrap-vue.css不引也没问题，不清楚为什么
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
```
> 最好把css文件从node_modules中提取出来，方便自己修改

## 布局
1、可以跟普通的bootstrap一样，可以直接用class定义
```html
<div class="container">
  <div class="row">
    <div class="col">
      第一列
    </div>
    <div class="col">
      第二列
    </div>
    <div class="col">
      第三列
    </div>
  </div>
</div>
```
也可以用bootstrap-vue特有的组件定义方式，下面等价于上面的
```html
<b-container>
    <b-row>
        <b-col>第一列</b-col>
        <b-col>第二列</b-col>
        <b-col>第三列</b-col>
    </b-row>
</b-container>
```

响应式布局，参考下面的表格，跟bootstrap3比，多了一个col自适应的功能：
<table>
    <tr>
        <td></td>
        <td>自适应大小(<576px)</td>
        <td>Small(≥576px)</td>
        <td>Medium(≥768px)</td>
        <td>Large(≥992px)</td> 
        <td>Extra large(≥1200px)</td>
   </tr>
   <tr>
        <td style="font-weight: bold;text-align: center;" colspan="6">bootstrap定义的方式</td>    
   </tr>
   <tr>
        <td>类前缀</td> 
        <td>.col-</td>
        <td>.col-sm-</td> 
        <td>.col-md-</td> 
        <td>.col-lg-</td> 
        <td>.col-xl-</td> 
   </tr>
    <tr>
        <td style="font-weight: bold;text-align: center;" colspan="6">bootstrap-vue定义的方式</td>
    </tr>
    <tr>
        <td>组件属性</td>
        <td>cols="*"</td>
        <td>sm="*"</td>
        <td>md="*"</td>
        <td>lg="*"</td>
        <td>xl="*"</td>
    </tr>
    <tr>
        <td style="font-weight: bold;text-align: center;" colspan="6">相同的属性</td>
    </tr>
    <tr>
        <td>最大容器宽度</td>
        <td>自动适应</td>
        <td>540px</td>
        <td>720px</td>
        <td>960px</td>
        <td>1140px</td>
    </tr>
</table>
