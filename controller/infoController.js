const Controller = require("../lib/Controller"),
	http = require("../lib/http"),
	phantom = require('phantom'),
	file = require('../lib/file'),
	cheerio = require("cheerio");
const axios = require('axios');

module.exports = new class extends Controller {
	// 获取 36氪每日资讯
	getSight(req, res) {
		let url = "http://36kr.com/", content, instance, page, status;
		let message = [];

		//文件格式{sightList : [], expire: ''}
		return file.readFile('files/mySelf/sightCache.json', 'json').then( result => {
			//缓存两个小时
			if(false && result.expire && (Date.now() - result.expire) < 7200000){
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
					console.log(result)
					if(result = "success"){
						return page.property('content');
					}else{
						this.paramError('url');
					}
				}).then( result => {
					content = result;
					//console.log(content)
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
					if(message.length === 0){
						message.push({
							title: '请求被云盾的应用防火墙拦截',
							brief: '很抱歉，由于您访问的URL有可能对网站造成安全威胁，您的访问被阻断。'
						})
					}
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

    async test( req, res){
        let fail = [];
        const phones = req.body.phones || [];
        const authorization = req.body.authorization;
        const instance = axios.create({
            baseURL: 'https://shop.xinfutongtech.com',
            timeout: 10000,
            headers: {'authorization': authorization}
        });
        console.log(phones, 'phones')
        for(let i = 0; i < phones.length; i++){
            const fansPhone = String(phones[i]);
            try{
                const res = await instance.post('/mall-shopping-admin/retailFans/listRetailEmpInfo', {
                    "corpId": "18275",
                    "fansPhone": fansPhone,
                    "page": 1,
                    "limit": 10
                });
                const resInfo = res.data.data.data
                console.log(resInfo)
                let eiId;
                if(resInfo[0]){
                    eiId = resInfo[0]['eiId'];
                }else{
                    throw new Error('没有该粉丝')
                }
        
                console.log(eiId)
        
                const res1 = await instance.get('/mall-shopping-admin/retailFans/listRetailFans', {
                    params: {
                        "id": eiId,
                        "fansPhone": fansPhone,
                        "pageNum": 1,
                        "pageSize": 10
                    }
                });
                const res1Info = res1.data.data.data
                let id;
                if(res1Info[0]){
                    id = res1Info[0]['id'];
                }else{
                    throw new Error('该粉丝数据不存在')
                }
                console.log(id)
                const res2 = await instance.get('/mall-shopping-admin/retailFans/deleteFans', {
                    params: {
                        "id": id,
                        "empId": eiId
                    }
                });
            }catch(err){
                fail.push([{
                    '电话': fansPhone,
                    '错误原因': err.message
                }])
            }
        }
        return {
            data : fail,
            str  : "操作成功"
        }
	}
}();