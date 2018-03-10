// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Moment from "moment"
import axios from "axios"
import router from './router'
import store from "./store"
import {axiosRequest} from './utils/request_axios'

import iView from 'iview'
import 'iview/dist/styles/iview.css'

Vue.config.productionTip = false

//myadd
Vue.prototype.$ajax = axios;

Vue.use(iView);

axiosRequest();

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