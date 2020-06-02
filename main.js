import Vue from 'vue'
import App from './App';

Vue.config.productionTip = false;

App.mpType = 'app';

const app = new Vue({
	...App
});
Vue.prototype.imageUrl = 'http://island.hellochaos.cn/uploads/';
app.$mount();
