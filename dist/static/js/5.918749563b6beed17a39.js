webpackJsonp([5],{CKme:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("gUGA"),i=a.n(s),r={components:{},data:function(){return{article:{}}},beforeMount:function(){var t=this,e=void 0;console.log(this.$route),console.log(t.$route.query.id),t.$route.query.id?(e=i()(t.$route.query.id),this.$ajax({method:"post",url:"/Interface/getHomeArticleDetail",data:{articleId:e,userId:this.userInfo?this.userInfo._id:null}}).then(function(e){switch(t.loading=!1,e.data.retcode){case 0:t.article=e.data.retdata;break;default:t.$Message.error(e.data.retmsg)}})):t.$Message.error("缺失articleId")},methods:{},computed:{isLogin:function(){return this.$store.getters.isLogin},userInfo:function(){return this.$store.getters.userInfo}}},n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"articleDetail_content"},[a("div",{staticClass:"content_left"},[a("div",{staticClass:"article_container"},[a("h1",{staticClass:"title"},[t._v(t._s(t.article.title))]),t._v(" "),a("div",{staticClass:"header"},[a("p",[t.article.userName&&t.article.userName.length>0?a("span",[t._v(t._s(t.article.userName)+" | ")]):t._e(),t._v(" "),a("span",[t._v(t._s(t._f("formatDate")(t.article.createDate,"HH:mm:ss")))])]),t._v(" "),t.article.updateDate?a("p",[t._v("最后修改于"+t._s(t._f("formatDate")(t.article.updateDate,"HH:mm:ss")))]):t._e()]),t._v(" "),a("div",{staticClass:"brief"},[t._v("\r\n                "+t._s(t.article.brief)+"\r\n            ")]),t._v(" "),a("div",{staticClass:"main",domProps:{innerHTML:t._s(t.article.content)}})])]),t._v(" "),a("div",{staticClass:"content_right"},[t.article.prev?a("a",{staticClass:"page_article",attrs:{href:"/articleDetail?id="+t.article.prev._id}},[a("h2",{staticClass:"title"},[t._v(t._s(t._f("formatStrByLen")(t.article.prev.title,25)))]),t._v(" "),a("div",{staticClass:"time"},[a("p",[t._v(t._s(t._f("formatDate")(t.article.prev.createDate,"HH:mm:ss")))]),t._v(" "),t._m(0)])]):t._e(),t._v(" "),t.article.next?a("a",{staticClass:"page_article",attrs:{href:"/articleDetail?id="+t.article.next._id}},[a("h2",{staticClass:"title"},[t._v(t._s(t._f("formatStrByLen")(t.article.next.title,25)))]),t._v(" "),a("div",{staticClass:"time"},[a("p",[t._v(t._s(t._f("formatDate")(t.article.next.createDate,"HH:mm:ss")))]),t._v(" "),t._m(1)])]):t._e()])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("span",[this._v("上一篇")]),this._v(" "),e("span",{staticClass:"triangle triangleL"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("span",[this._v("下一篇")]),this._v(" "),e("span",{staticClass:"triangle triangleR"})])}]};var c=a("Z0/y")(r,n,!1,function(t){a("d+Qi"),a("MaHj")},"data-v-46280006",null);e.default=c.exports},MaHj:function(t,e){},"d+Qi":function(t,e){}});
//# sourceMappingURL=5.918749563b6beed17a39.js.map