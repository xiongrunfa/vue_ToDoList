import Vue from "vue";
import {
  Button,
  Dialog,
  Form,
  FormItem,
  Input,
  RadioGroup,
  Radio,
  Message,
  Tabs,
  TabPane,
  Card,
} from "element-ui";
Vue.use(Button);
Vue.use(Dialog);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.component(Message);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Card);

import "./styles/main.css";
import App from "./app.vue";
import axios from "axios";
axios.defaults.baseURL = "http://47.97.183.158:1999/api/";
// 配置axios请求拦截
axios.interceptors.request.use((config) => {
  if (config.url == "todos/toggle") {
    config.headers.Authorization = "XRF";
    return config;
  }
  return config;
});
Vue.prototype.$http = axios;
Vue.prototype.$message = Message;
var vm = new Vue({
  el: "#app",
  render: (h) => h(App),
});
