const express 			= 			require("express"),
	md5 				= 			require("md5"),
	log 				= 			require("../lib/log"),
	config 				= 			require("../global/config"),
	info 		 		= 			require("../controller/infoController"),
	router 				= 			express.Router();

const whiteApi = ['/login', '/getSight', "/getHotArticleList", "/register", "/logout"];

//开发不验证
whiteApi.push('/addArticle',  '/getArticleDetail', '/getArticleListById')

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

module.exports = router;