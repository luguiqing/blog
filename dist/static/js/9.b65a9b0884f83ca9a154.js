webpackJsonp([9],{"7tKY":function(t,e,r){var o=r("vwmW");"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);r("FIqI")("fe786ba0",o,!0,{})},FpTr:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=r("gUGA"),a=r.n(o),s=r("VKKs"),i={components:{editor:r("cnC7").a},beforeMount:function(){var t=this;this.userInfo=s.a.getItem({key:"userInfo",type:"object"}),this.$route.query&&this.$route.query.id&&(this.articleId=a()(this.$route.query.id),t.$ajax({method:"post",url:"/Interface/getArticleDetail",data:{articleId:t.articleId,userId:t.userInfo._id}}).then(function(e){switch(e.data.retcode){case 0:t.formItem.title=e.data.retdata.title,t.formItem.brief=e.data.retdata.brief,t.html=e.data.retdata.content,t.formItem.status=0!==e.data.retdata.status,t.$Message.success("加载文章内容成功");break;default:t.$Message.error(e.data.retmsg)}}))},data:function(){return{formItem:{title:"",brief:"",status:!0},ruleValidate:{title:[{required:!0,message:"The title cannot be empty",trigger:"blur"}],brief:[{required:!0,message:"The brief cannot be empty",trigger:"blur"}]},articleId:null,userInfo:null,html:""}},methods:{handleSubmit:function(t){var e=this;e.$refs.editor.content.length>0?e.$refs[t].validate(function(t){if(t){var r={title:e.formItem.title,brief:e.formItem.brief,status:e.formItem.status?1:0,content:e.$refs.editor.content,userId:e.userInfo._id};null!==e.articleId&&(r.articleId=e.articleId),e.$ajax({method:"post",url:"/Interface/addArticle",data:r}).then(function(t){switch(t.data.retcode){case 0:console.log(t.data),e.$Message.success("保存文章成功"),e.$router.push({name:"omsUserArticleList"});break;default:e.$Message.error(t.data.retmsg)}})}else e.$Message.error("请完善信息！")}):e.$Message.error("请完善信息！")},handleReset:function(t){this.$refs[t].resetFields(),this.html=""}},computed:{isLogin:function(){return this.$store.getters.isLogin}},watch:{$route:function(t,e){t.query&&t.query.id||this.handleReset("formValidate")}}},n={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"omsAddArticl_container"},[r("Form",{ref:"formValidate",attrs:{model:t.formItem,"label-width":70,rules:t.ruleValidate}},[r("FormItem",{attrs:{label:"文章标题",prop:"title"}},[r("Input",{attrs:{placeholder:"Enter title...",maxlength:50},model:{value:t.formItem.title,callback:function(e){t.$set(t.formItem,"title",e)},expression:"formItem.title"}})],1),t._v(" "),r("FormItem",{attrs:{label:"文章简介",prop:"brief"}},[r("Input",{attrs:{type:"textarea",autosize:{minRows:2,maxRows:5},maxlength:200,placeholder:"Enter brief..."},model:{value:t.formItem.brief,callback:function(e){t.$set(t.formItem,"brief",e)},expression:"formItem.brief"}})],1),t._v(" "),r("FormItem",{attrs:{label:"对外开放"}},[r("i-switch",{attrs:{size:"large"},model:{value:t.formItem.status,callback:function(e){t.$set(t.formItem,"status",e)},expression:"formItem.status"}},[r("span",{attrs:{slot:"open"},slot:"open"},[t._v("On")]),t._v(" "),r("span",{attrs:{slot:"close"},slot:"close"},[t._v("Off")])])],1),t._v(" "),r("FormItem",{attrs:{"label-width":1}},[r("Button",{staticStyle:{"margin-right":"10px"},attrs:{type:"primary"},on:{click:function(e){t.handleSubmit("formValidate")}}},[t._v("保存")]),t._v(" "),r("Button",{staticStyle:{"margin-left":"8px"},attrs:{type:"ghost"},on:{click:function(e){t.handleReset("formValidate")}}},[t._v("重置")])],1)],1),t._v(" "),r("editor",{ref:"editor",attrs:{html:t.html}})],1)},staticRenderFns:[]};var l=r("Z0/y")(i,n,!1,function(t){r("7tKY")},"data-v-52d0381c",null);e.default=l.exports},vwmW:function(t,e,r){(t.exports=r("XLS9")(!0)).push([t.i,"\n.omsAddArticl_container[data-v-52d0381c] {\n  position: relative;\n  box-sizing: border-box;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  width: 100%;\n  padding: 20px;\n  background-color: #fff;\n}\n","",{version:3,sources:["G:/projects/vue-cli-demo/gqBlog/src/pages/omsAddArticle.vue"],names:[],mappings:";AACA;EACE,mBAAmB;EACnB,uBAAuB;EACvB,+BAA+B;EAC/B,4BAA4B;EAC5B,YAAY;EACZ,cAAc;EACd,uBAAuB;CACxB",file:"omsAddArticle.vue",sourcesContent:["\n.omsAddArticl_container[data-v-52d0381c] {\n  position: relative;\n  box-sizing: border-box;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  width: 100%;\n  padding: 20px;\n  background-color: #fff;\n}\n"],sourceRoot:""}])}});
//# sourceMappingURL=9.b65a9b0884f83ca9a154.js.map