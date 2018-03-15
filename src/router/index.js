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
				component: resolve => require(["@/pages/dashboard"], resolve),
				children: [
					{
						path: '',
						name: "websiteArticleList",
						component: resolve => require(["@/pages/articleList"], resolve)
					}
				]
			},
			{
				path: 'articleDetail',
				name: "articleDetail",
				component: resolve => require(["@/pages/articleDetail"], resolve)
			}
		]
	},
	{
		path: '/404',
		name: "404",
		meta: { requiresAuth: true },
		component: resolve => require(["@/pages/404"], resolve)
	}
]

admin = [
	{
		path: "/omsIndex",
		component: resolve => require(["@/pages/omsIndex"], resolve),
		children: [
			{
				path: '',
				name: "omsUserArticleList",
				meta: { requiresAuth: true },
				component: resolve => require(["@/pages/omsUserArticleList"], resolve)
			},
			{
				path: 'omsAddArticle',
				name: "omsAddArticle",
				meta: { requiresAuth: true },
				component: resolve => require(["@/pages/omsAddArticle"], resolve)
			},
			{
				path: 'omsUpdateArticle',
				name: "omsUpdateArticle",
				meta: { requiresAuth: true },
				component: resolve => require(["@/pages/omsUpdateArticle"], resolve)
			},
			{
				path: 'omsAllArticleList',
				name: "omsAllArticleList",
				meta: { requiresAuth: true },
				component: resolve => require(["@/pages/omsAllArticleList"], resolve)
			},
			{
				path: 'omsAllUserList',
				name: "omsAllUserList",
				meta: { requiresAuth: true },
				component: resolve => require(["@/pages/omsAllUserList"], resolve)
			}
		]
	}
]

routes = routes.concat(client, admin);

Vue.use(Router)

export default new Router({
	mode: "history",
	routes: routes
})