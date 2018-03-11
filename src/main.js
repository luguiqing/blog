// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Moment from "moment"
import axios from "axios"
import VueQuillEditor from 'vue-quill-editor'
import router from './router'
import store from "./store"
import config from "../global/config"
import Storage from "./utils/storage"
import {axiosRequest} from './utils/request_axios'

import iView from 'iview'
import 'iview/dist/styles/iview.css'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'

Vue.config.productionTip = false

//myadd
Vue.prototype.$ajax = axios;

Vue.use(iView);
Vue.use(VueQuillEditor)

axiosRequest();

router.beforeEach( (to, from, next) => {
	console.log(to)
	if(to.matched.length ===0){
		next('/404');
	}
	if(to.meta && to.meta.requiresAuth){
		let userInfo = Storage.getItem({ key : 'userInfo', type : 'object'});
		if(userInfo && userInfo.token && (Date.now()-userInfo.expires) < config.tokenObj.exp ){
			next()
		}else{
			next('/')
		}
	}else{
		next();
	}
})

Vue.filter("formatDate", value => {
	return Moment(value).format("YYYY-MM-DD") + ' ' + Moment(value).format('dddd');
});
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