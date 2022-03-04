const express 			= 			require("express"),
	md5 				= 			require("md5"),
	log 				= 			require("../lib/log"),
	config 				= 			require("../global/config"),
	info 		 		= 			require("../controller/infoController"),
	router 				= 			express.Router();

const whiteApi = ['/test', '/login', '/getSight', "/getHotArticleList", "/register", "/logout", "/getHomeArticleDetail"];

//开发不验证
/*whiteApi.push('/addArticle', '/getArticleDetail', '/getArticleListById', '/changeArticleStatus', '/forceDeleteArticle',
				'/deleteArticle', '/forceDeleteUser', '/changeUserStatus', '/getUserList')*/

router.all("/*", (req, res, next) => {
	let logObj = {},
		signObj = {},
		temp;
	for (temp in req.body) {
		if (typeof req.body[temp] !== "string" || req.body[temp].length < 200) {
			logObj[temp] = req.body[temp];
			signObj[temp] = req.body[temp];
		} else {
			logObj[temp] = "数据过长不展示";
		}
	}
	log.info(JSON.stringify({
		url: req.originalUrl,
		method: req.method,
		params: logObj
	}), "Request", req.originalUrl);

	if(whiteApi.indexOf(req.path) > -1){
		//开发中添加
		/*req.session.userInfo = {};
		req.session.userInfo._id = req.body.adminId ? req.body.adminId : req.body.userId;*/
		next();
	}else{
		console.log(req.session.token)
		if(req.session.token){
			let signature = req.headers.authorization.split(" ")[1];
			//console.log(signature);
			let temp;
			temp = md5(config.tokenObj.secret + JSON.stringify(req.body) + req.session.token);
			if(temp === signature){
				next();
			}else{
				res.json({
					retcode		:	-6666,
					retmsg		:	"登录过期"
				});
			}
		}else{
			res.json({
				retcode		:	-6666,
				retmsg		:	"请先登录"
			});
		}
	}
});

router.post( "/getSight",					( ...args ) => info.safeMode( "getSight", ...args ) );

router.post( "/logout",					( ...args ) => info.safeMode( "logout", ...args ) );

router.post( "/login",					( ...args ) => info.safeMode( "login", ...args ) );

router.post( "/register",					( ...args ) => info.safeMode( "register", ...args ) );
//暂没写
router.post( "/editUserInfo",					( ...args ) => info.safeMode( "editUserInfo", ...args ) );

router.post( "/addArticle",					( ...args ) => info.safeMode( "addArticle", ...args ) );
//获取文章详情
router.post( "/getArticleDetail",					( ...args ) => info.safeMode( "getArticleDetail", ...args ) );
//获取用户自身文章列表
router.post( "/getArticleListById",					( ...args ) => info.safeMode( "getArticleListById", ...args ) );
//分页获取热门文章列表
router.post( "/getHotArticleList",					( ...args ) => info.safeMode( "getHotArticleList", ...args ) );
//分页获取自己文章列表
router.post( "/getArticleListByPageAndId",					( ...args ) => info.safeMode( "getArticleListByPageAndId", ...args ) );
//oms获取全部文章列表
router.post( "/getAllArticleList",					( ...args ) => info.safeMode( "getAllArticleList", ...args ) );
//管理员更改文章状态
router.post( "/changeArticleStatus",					( ...args ) => info.safeMode( "changeArticleStatus", ...args ) );
//管理员强制删除文章
router.post( "/forceDeleteArticle",					( ...args ) => info.safeMode( "forceDeleteArticle", ...args ) );
//用户删除文章
router.post( "/deleteArticle",					( ...args ) => info.safeMode( "deleteArticle", ...args ) );
//管理员强制改变用户状态
router.post( "/changeUserStatus",					( ...args ) => info.safeMode( "changeUserStatus", ...args ) );
//管理员获取用户列表
router.post( "/getUserList",					( ...args ) => info.safeMode( "getUserList", ...args ) );
//管理员强制删除用户的全部数据
router.post( "/forceDeleteUser",					( ...args ) => info.safeMode( "forceDeleteUser", ...args ) );
//获取首页点击进去的文章详情
router.post( "/getHomeArticleDetail",					( ...args ) => info.safeMode( "getHomeArticleDetail", ...args ) );

router.post( "/test",					( ...args ) => info.safeMode( "test", ...args ) );

module.exports = router;