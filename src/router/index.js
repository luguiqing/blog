import Vue from 'vue'
import Router from 'vue-router'

let routes = [], client = [], admin = [];

client = [
	{
		path: "/",
		component: resolve => require(["@/pages/websiteIndex"], resolve),
		children: [
			{
				path: '',
				name: "websiteIndex",
				component: resolve => require(["@/pages/dashboard"], resolve)
			},
			{
				path: 'articleList',
				name: "websiteArticleList",
				component: resolve => require(["@/pages/articleList"], resolve)
			}
		]
	},{
		path: "/omsLogin",
		name: "oms",
		component: resolve => require(["@/pages/omsIndex"], resolve)
	}
]
// client = [
// 	{
// 		path: "/",
// 		component: resolve => require(["@/pages/websiteIndex"], resolve),
// 		children: [
// 			{
// 				path: '',
// 				name: "websiteIndex",
// 				component: resolve => require(["@/pages/dashboard"], resolve)
// 			},
// 			{
// 				path: 'articleList',
// 				name: "websiteArticleList",
// 				component: articleList
// 			}
// 		]
// 	}
// ]

routes = routes.concat(client, admin);

Vue.use(Router)

export default new Router({
	mode: "history",
	routes: routes
})