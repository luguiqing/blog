import axios from 'axios';
import globalConfig from "../../global/config";

export function axiosRequest(){
	axios.interceptors.request.use(function(config) {
			if(globalConfig.proxyPrefix){
				config.url = globalConfig.proxyPrefix + config.url;
			}
			return config;
		},
		function(error) {
			// Do something with request error
			return Promise.reject(error);
		}
	);
}

export function axiosResponse(){

}