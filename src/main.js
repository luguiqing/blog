// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Moment from "moment"
import axios from "axios"
//import VueQuillEditor from 'vue-quill-editor'
import router from './router'
import store from "./store"
import config from "../global/config"
import Storage from "./utils/storage"
import {axiosRequest} from './utils/request_axios'

import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';

//iview局部引入
import { Button, Table, Input, Form, Icon, Select, FormItem, Option, Row, Col, Switch, Modal, Message, Menu, MenuItem, Submenu, Page} from 'iview';

//import iView from 'iview'
import 'iview/dist/styles/iview.css'
//import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'

Vue.config.productionTip = false

//myadd
Vue.prototype.$ajax = axios;

//Vue.use(iView);
//不全局引用，减少打包的vender.js大小
//Vue.use(VueQuillEditor)

axiosRequest();
//管理员路由
const authRouterList = ['omsUserList', 'omsAllArticleList'];

router.beforeEach( (to, from, next) => {
	console.log(to)
	if(to.matched.length ===0){
		next('/404');
	}
	if(to.meta && to.meta.requiresAuth){
		let userInfo = Storage.getItem({ key : 'userInfo', type : 'object'});
		if(userInfo && userInfo.token && (Date.now()-userInfo.expires) < config.tokenObj.exp ){
			if(authRouterList.indexOf(to.name) > -1){
				if(userInfo.auth == 2){
					next();
				}else{
					next('/')
				}
			}else{
				next();
			}
		}else{
			store.commit("updateLoginStatus", {isLogin : false})
			next('/')
		}
	}else{
		next();
	}
})
//iview按需引入
let {...iviewComponent} = {Button, Table, Input, Form, Icon, Select, FormItem, Option, Row, Col, Modal, Message, Menu, MenuItem, Submenu, Page}
for(let item in iviewComponent){
	Vue.component(item, iviewComponent[item]);
}
Vue.component('i-switch', Switch);
Vue.prototype.$Message = Message;


Vue.filter("formatDate", (value, type )=> {
	return Moment(value).format("YYYY-MM-DD") + ' ' + Moment(value).format(type);
});

Vue.filter("formatStrByLen", (value, len) => {
	if(value.length > len){
        return value.substring(0, len) + '...';
    }else{
        return value;
    }
});

//entry 错误监控
// Raven
//     .config('https://eb207c7a1c854b4e8c58afc88cac8d65@sentry.io/1242050')
//     .addPlugin(RavenVue, Vue)
//     .install();

// Raven.setTagsContext({
//     environment: "production"
// });
// Raven.captureMessage('hello world!', {tags: {
//     locale: 'en-us',
//     guiqing: 'good'
// }});
// Raven.setUserContext({
//     email: 'foo@example.com'+Math.random()
// });
// try{
// 	console.log(guiqing)
// }catch(e){
// 	Raven.captureException(e,{
// 		tags: {
// 	    	locale: 'en-us'
// 		},
// 		extra:
// 		{
// 			contesxt: 'context'
// 		}
// 	})
// }
/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	components: {
		App
	},
	template: '<App/>'
})