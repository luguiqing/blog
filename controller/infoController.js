const Controller = require("../lib/Controller"),
	http = require("../lib/http"),
	phantom = require('phantom'),
	cheerio = require("cheerio");

module.exports = new class extends Controller {
	// 获取 36氪每日资讯
	getSight(req, res) {
		let url = "http://36kr.com/", content, instance, page, status;
		let message = [];
		return phantom.create().then( result => {
			instance = result;
			return instance.createPage()
		}).then( result => {
			page = result;
			return page.open(url)
		}).then( result => {
			if(result = "success"){
				return page.property('content');
			}else{
				this.paramError('url');
			}
		}).then( result => {
			content = result;
			return instance.exit();
		}).then( result => {
			let $ = cheerio.load(content, {decodeEntities: false});
			$("li.real_time_wrapper").each(function(){
				//console.log($(this).find('span.title').text())
				message.push({
					title : $(this).find('span.title').text(),
					brief : $(this).find('div.show-content').text()
				})
			});
			return 1;
		}).then( result => {
			return{
				data: message,
				str: "获取每日资讯列表"
			}
		})
	}

	login( req, res){
		this.validEmpty(["userName", "password"], req.body);
		/*return this.request('/user/login', {
			userName  	:    req.body.userName,
			password 	: 	 req.body.password
		}).then( result => {
			return {
				data : result,
				str  : "登录"
			}
		})*/
		return this.proxyRequest(req, res, "/user/login", {
			userName  	:    req.body.userName,
			password 	: 	 req.body.password
		}).then( result => {
			return {
				data : result.body,
				str  : "登录"
			}
		})
	}

	editUserInfo( req, res){
		/*return this.request('/user/editUserInfo', {}).then( result => {
			console.log(req);
			return {
				data : result,
				str  : "修改用户信息"
			}
		})*/
		return this.proxyRequest(req, res, "/user/editUserInfo", {}).then( result => {
			return {
				data : result.body,
				str  : "修改用户信息"
			}
		})
	}
}();