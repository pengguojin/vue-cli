import Vue from 'vue'

// 按需引入element组件
import { Input, Button, Radio, RadioGroup, RadioButton, Col, Row, Menu, Submenu, MenuItem, MenuItemGroup, Tabs, TabPane } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.prototype.$ELEMENT = { size: 'small' }; // ele全局样式配置
Vue.use(Input);
Vue.use(Button);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Col);
Vue.use(Row);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Tabs);
Vue.use(TabPane);