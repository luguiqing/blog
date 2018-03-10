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
	}
]

admin = [
	{
		path: "/omsIndex",
		name: "omsIndex",
		component: resolve => require(["@/pages/omsIndex"], resolve)
	}
]

routes = routes.concat(client, admin);

Vue.use(Router)

export default new Router({
	mode: "history",
	routes: routes
})