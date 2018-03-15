import axios from 'axios';
import md5 from "md5";
import store from "../store"
import router from '../router';
import Storage from './storage';
import globalConfig from "../../global/config";

//const whiteApi = ['/Interface/getSight', '/Interface/login']
const whiteApi = ['/Interface/login', '/Interface/getSight', '/Interface/register',
 '/Interface/logout', '/Interface/getHomeArticleDetail', '/Interface/getHotArticleList']

export function axiosRequest(Vue) {
	axios.interceptors.request.use(function(config) {
			//console.log(config)
			if (whiteApi.indexOf(config.url) === -1) {
				let userInfo = Storage.getItem({
					key: 'userInfo',
					type: 'object'
				});

				if (userInfo && userInfo.token && (Date.now() - userInfo.expires) < globalConfig.tokenObj.exp) {
					let signature, dataStr = JSON.stringify(config.data);
					//console.log(userInfo.token)
					signature = md5(globalConfig.tokenObj.secret + dataStr + userInfo.token);
					config.headers.Authorization = 'Bearer ' + signature;
				} else {
					router.replace({
						path: '/'
					});
				}
			}
			if (globalConfig.proxyPrefix) {
				config.url = globalConfig.proxyPrefix + config.url;
			}
			return config;
		},
		function(error) {
			// Do something with request error
			return Promise.reject(error);
		}
	);

	axios.interceptors.response.use(function(response) {
		//console.log(response)
		switch(response.data.retcode){
			case -6666:
				//alert(response.data.retmsg);
				Storage.removeItem('userInfo');
				store.commit("updateLoginStatus", {isLogin : false});
				router.replace({
					path: '/'
				});
				break;
		}
		return response;
	}, function(error) {
		// Do something with response error
		return Promise.reject(error);
	});
}

export function axiosResponse() {

}