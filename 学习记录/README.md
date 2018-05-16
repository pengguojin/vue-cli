# 安装
- 1、全局安装vue     
    通过npm安装：```cnpm i -g vue-cli```        
    安装完成后，运行```vue```命令输出一些帮助内容表示安装成功
- 2、列出模板列表：     
    ```vue list```
- 3、创建工程       
  ```vue init <template> <path>```  
    其中template是模板名称，path是工程路径      
    一般使用webpack模板：```vue init webpack 工程名称```

# 文件目录
- .babelrc            babel配置       
- .editorconfig       编辑器配置      
- .eslintignore       eslint忽略列表      
- .eslintrc.js        eslint配置
- .gitignore          git忽略列表
- .postcssrc.js       postcss配置
- package.json        node配置
- README.md           说明

- index.html          入口文件


- config/             配置文件
- src/                源文件(打包)
- static/             静态资源
- test/               测试配置、用例
- build/              生成用的配置

--------------------------------------------------------------------------------

可用的脚本：
- dev/start           运行项目(开发模式)
- test                测试
  - unit              单元测试
  - e2e               端到端测试
- lint                代码质量测试
- build               生成项目


## 编写一个简单的程序
- 1、在components文件夹下添加一个article.vue文件

    ```javascript
    <template lang="html">
      <div class="">
        用户: {{name}}
      </div>
    </template>
    
    <script>
    export default {
      data () {
        return {
          name: 'blue'
        }
      }
    }
    </script>
    
    <style lang="css">
    </style>

    ```
- 2、在components文件夹下添加一个user.vue文件

    ```javascript
    <template lang="html">
      <div></div>
    </template>
    
    <script>
    export default {
      data () {
        return {
        }
      }
    }
    
    </script>
    <style lang="css" scoped>
    </style>

    ```

- 3、添加路由，修改index.js

    ```javascript
    //引入两个组件
    import User from '@/components/user'
    import Article from '@/components/article'
    //添加路由
    export default new Router({
      routes: [
        {
          path: '/',
          name: 'user',
          component: User
        },
        {
          path: '/article',
          name: 'article',
          component: Article
        }
      ]
    })
    ```

- 4、在入口的地方添加跳转的代码，修改App.vue

    ```html
    <router-link :to="{name: 'user', params: {}}">用户</router-link>
    <router-link :to="{name: 'article', params: {}}">文章</router-link>
    ```

- 5、运行项目，执行命令```npm start```，访问localhost:8080

## 父子组件传值
- 父 -> 子：
    - 父组件   
        ```javascript
        :xxx="数据"
        ```   
    - 子组件：
        ```javascript
        子级.$attrs.xxx
        ```
    - 父组件实现代码
        ```html
        //listitem.vue是子组件
        import ListItem from '@/components/listitem'
        //引入后需要加入到vue的组件中
        components: { ListItem }
        //添加模板的实现代码，其中:data="item"就是父组件数据传值到子组件的方法
        <ul>
          <ListItem v-for="item in items" :data="item">{{item.name}}</ListItem>
        </ul>
        ```
    - 子组件实现代码：
        ```javascript
        //通过mouted钩子函数，和this.$attrs获取父组件传过来的值
        mounted () {
            //赋值给data，则直接{{data.值}}使用
            this.data = this.$attrs.data;
        }
        ```
    - 完整的实现代码
        ```html
        <!-- 父组件list.vue -->
        <template lang="html">
          <ul>
              <ListItem v-for="item in items" :data="item">{{item.name}}</ListItem>
          </ul>
        </template>
        
        <script>
        import ListItem from '@/components/listitem'
        
        export default {
          data () {
            return {
                items: [
                    { name: '手机', sales: 1002, prace: 5880 },
                    { name: '衣服', sales: 100, prace: 1880 },
                    { name: '电脑', sales: 4502, prace: 580 },
                    { name: '零食', sales: 12, prace: 58810 },
                    { name: '饮料', sales: 4.0, prace: 70180 }
                ]
            }
          },
          components: { ListItem }
        }
        
        </script>
        <style lang="css" scoped>
        </style>
        
        
        <!-- 子组件listitem.vue -->
        <template lang="html">
          <div>{{data.sales}}</div>
        </template>
        
        <script>
        export default {
          data () {
            return {
              data: {}
            };
          },
          mounted () {
            console.log(this.$attrs.data);
              
            this.data = this.$attrs.data;
          }
        }
        </script>
        <style lang="css" scoped>
        </style>
        ```

- 子 -> 父   函数

- 声明周期的钩子函数：
    - beforeCreate：创建实例之前执行的钩子事件
    - created：实例创建完成后执行的钩子
    - beforeMount：将编译完成的HTML挂载到对应虚拟dom时触发的钩子
    - mounted：编译好的HTML挂载到页面完成后执行的事件钩子，此钩子函数中一般会做一些ajax请求获取数据进行数据初始化，在整个实例只执行一次