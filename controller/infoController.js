const Controller = require("../lib/Controller"),
	http = require("../lib/http"),
	phantom = require('phantom'),
	file = require('../lib/file'),
	cheerio = require("cheerio");

module.exports = new class extends Controller {
	// 获取 36氪每日资讯
	getSight(req, res) {
		let url = "http://36kr.com/", content, instance, page, status;
		let message = [];

		//文件格式{sightList : [], expire: ''}
		return file.readFile('files/mySelf/sightCache.json').then( result => {

			console.log("callback")
			//缓存两个小时
			if(result.expire && (Date.now() - result.expire) < 7200000){
				message = result.sightList;
				return{
					data: message,
					str: "获取每日资讯列表"
				}
			}else{
				return phantom.create().then( result => {
					instance = result;
					return result.createPage()
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
					let tempStr = {
						sightList :  message,
						expire 	  :  Date.now()
					};
					return file.writeFile('files/mySelf/sightCache.json', JSON.stringify(tempStr), 'files/mySelf');

				}).then( result => {
					return{
						data: message,
						str: "获取每日资讯列表"
					}
				})
			}
		})
	}

	login( req, res){
		this.validEmpty(["userName", "password"], req.body);
		return this.request('/user/login', {
			userName  	:    req.body.userName,
			password 	: 	 req.body.password
		}).then( result => {
			req.session.token = Math.random().toString(36).slice(3,8);
			req.session.userInfo = result;
			result.token = req.session.token;
			return {
				data : result,
				str  : "登录"
			}
		})
		//作为代理转发
		/*return this.proxyRequest(req, res, "/user/login", {
			userName  	:    req.body.userName,
			password 	: 	 req.body.password
		}).then( result => {
			return {
				data : result.body,
				str  : "登录"
			}
		})*/
	}

	register( req, res){
		this.validEmpty(["userName", "password"], req.body);
		return this.request('/user/register', req.body).then( result => {
			req.session.token = Math.random().toString(36).slice(3,8);
			req.session.userInfo = result;
			result.token = req.session.token;
			return {
				data : result,
				str  : "注册"
			}
		})
	}

	logout( req, res){
		req.session.token = null;
		return {
			data : '',
			str  : "退出登录"
		}
	}

	editUserInfo( req, res){
		return this.request('/user/editUserInfo', {}).then( result => {
			console.log(req);
			return {
				data : result,
				str  : "修改用户信息"
			}
		})
	}

	addArticle( req, res ){
		this.validEmpty(["userId", "content", "title", "brief", "status"], req.body);

		if(req.session.userInfo._id !== req.body.userId){
			this.paramError('userId错误')
		}

		return this.request('/article/addArticle', req.body).then( result => {
			return {
				data : result,
				str  : "新增文章"
			}
		})
	}

	getArticleDetail( req, res ){
		this.validEmpty(["userId", "articleId"], req.body);

		if(req.session.userInfo._id !== req.body.userId){
			this.paramError('userId错误')
		}

		return this.request('/article/getArticleDetail', req.body).then( result => {
			return {
				data : result,
				str  : "获取文章详情"
			}
		})
	}

	getArticleListById( req, res ){
		this.validEmpty(["userId"], req.body);

		if(req.session.userInfo._id !== req.body.userId){
			this.paramError('userId错误')
		}

		return this.request('/article/getArticleListById', req.body).then( result => {
			return {
				data : result,
				str  : "获取文章列表"
			}
		})
	}

	getHotArticleList( req, res ){
		this.validEmpty(["pageSize", "page"], req.body);

		return this.request('/article/getHotArticleList', req.body).then( result => {
			return {
				data : result,
				str  : "分页获取热门文章列表"
			}
		})
	}

	getArticleListByPageAndId( req, res ){
		this.validEmpty(["pageSize", "page", "userId"], req.body);

		if(req.session.userInfo._id !== req.body.userId){
			this.paramError('userId错误')
		}

		return this.request('/article/getArticleListByPageAndId', req.body).then( result => {
			return {
				data : result,
				str  : "分页获取自己文章列表"
			}
		})
	}

	getAllArticleList( req, res ){
		this.validEmpty(["userId"], req.body);

		if(req.session.userInfo._id !== req.body.userId){
			this.paramError('userId错误')
		}

		return this.request('/article/getAllArticleList', req.body).then( result => {
			return {
				data : result,
				str  : "获取全部文章列表"
			}
		})
	}

	changeArticleStatus( req, res ){
		this.validEmpty(["userId", "articleId", "status"], req.body);

		if(req.session.userInfo._id !== req.body.userId){
			this.paramError('userId错误')
		}

		return this.request('/article/changeArticleStatus', req.body).then( result => {
			return {
				data : result,
				str  : "更改文章状态成功"
			}
		})
	}

	forceDeleteArticle( req, res ){
		this.validEmpty(["userId", "articleId"], req.body);

		if(req.session.userInfo._id !== req.body.userId){
			this.paramError('userId错误')
		}

		return this.request('/article/forceDeleteArticle', req.body).then( result => {
			return {
				data : result,
				str  : "删除文章操作成功"
			}
		})
	}

	deleteArticle( req, res ){
		this.validEmpty(["userId", "articleId"], req.body);

		if(req.session.userInfo._id !== req.body.userId){
			this.paramError('userId错误')
		}

		return this.request('/article/deleteArticle', req.body).then( result => {
			return {
				data : result,
				str  : "删除文章操作成功"
			}
		})
	}

	changeUserStatus( req, res ){
		this.validEmpty(["userId", "adminId"], req.body);

		if(req.session.userInfo._id !== req.body.adminId){
			this.paramError('userId错误')
		}

		return this.request('/user/changeUserStatus', req.body).then( result => {
			return {
				data : result,
				str  : "更改用户状态操作成功"
			}
		})
	}

	getUserList( req, res ){
		this.validEmpty(["userId"], req.body);

		if(req.session.userInfo._id !== req.body.userId){
			this.paramError('userId错误')
		}

		return this.request('/user/getUserList', req.body).then( result => {
			return {
				data : result,
				str  : "获取用户列表操作成功"
			}
		})
	}

	forceDeleteUser( req, res ){
		this.validEmpty(["userId", "adminId"], req.body);

		if(req.session.userInfo._id !== req.body.adminId){
			this.paramError('userId错误')
		}

		return this.request('/user/forceDeleteUser', req.body).then( result => {
			return {
				data : result,
				str  : "删除用户操作成功"
			}
		})
	}

	getHomeArticleDetail( req, res ){
		this.validEmpty(["articleId"], req.body);

		return this.request('/article/getHomeArticleDetail', req.body).then( result => {
			return {
				data : result,
				str  : "获取文章详情操作成功"
			}
		})
	}
}();