webpackJsonp([4],{"6Dmw":function(t,e,i){var s=i("mqq6");"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);i("FIqI")("74adaa57",s,!0,{})},"7tKY":function(t,e,i){var s=i("vwmW");"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);i("FIqI")("fe786ba0",s,!0,{})},FpTr:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i("gUGA"),o=i.n(s),n=i("VKKs"),r={components:{editor:i("cnC7").a},beforeMount:function(){var t=this;this.userInfo=n.a.getItem({key:"userInfo",type:"object"}),this.$route.query&&this.$route.query.id&&(this.articleId=o()(this.$route.query.id),t.$ajax({method:"post",url:"/Interface/getArticleDetail",data:{articleId:t.articleId,userId:t.userInfo._id}}).then(function(e){switch(e.data.retcode){case 0:t.formItem.title=e.data.retdata.title,t.formItem.brief=e.data.retdata.brief,t.html=e.data.retdata.content,t.formItem.status=0!==e.data.retdata.status,t.$Message.success("加载文章内容成功");break;default:t.$Message.error(e.data.retmsg)}}))},data:function(){return{formItem:{title:"",brief:"",status:!0},ruleValidate:{title:[{required:!0,message:"The title cannot be empty",trigger:"blur"}],brief:[{required:!0,message:"The brief cannot be empty",trigger:"blur"}]},articleId:null,userInfo:null,html:""}},methods:{handleSubmit:function(t){var e=this;e.$refs.editor.content.length>0?e.$refs[t].validate(function(t){if(t){var i={title:e.formItem.title,brief:e.formItem.brief,status:e.formItem.status?1:0,content:e.$refs.editor.content,userId:e.userInfo._id};null!==e.articleId&&(i.articleId=e.articleId),e.$ajax({method:"post",url:"/Interface/addArticle",data:i}).then(function(t){switch(t.data.retcode){case 0:console.log(t.data),e.$Message.success("保存文章成功"),e.$router.push({name:"omsUserArticleList"});break;default:e.$Message.error(t.data.retmsg)}})}else e.$Message.error("请完善信息！")}):e.$Message.error("请完善信息！")},handleReset:function(t){this.$refs[t].resetFields(),this.html=""}},computed:{isLogin:function(){return this.$store.getters.isLogin}},watch:{$route:function(t,e){t.query&&t.query.id||this.handleReset("formValidate")}}},a={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"omsAddArticl_container"},[i("Form",{ref:"formValidate",attrs:{model:t.formItem,"label-width":70,rules:t.ruleValidate}},[i("FormItem",{attrs:{label:"文章标题",prop:"title"}},[i("Input",{attrs:{placeholder:"Enter title...",maxlength:50},model:{value:t.formItem.title,callback:function(e){t.$set(t.formItem,"title",e)},expression:"formItem.title"}})],1),t._v(" "),i("FormItem",{attrs:{label:"文章简介",prop:"brief"}},[i("Input",{attrs:{type:"textarea",autosize:{minRows:2,maxRows:5},maxlength:200,placeholder:"Enter brief..."},model:{value:t.formItem.brief,callback:function(e){t.$set(t.formItem,"brief",e)},expression:"formItem.brief"}})],1),t._v(" "),i("FormItem",{attrs:{label:"对外开放"}},[i("i-switch",{attrs:{size:"large"},model:{value:t.formItem.status,callback:function(e){t.$set(t.formItem,"status",e)},expression:"formItem.status"}},[i("span",{attrs:{slot:"open"},slot:"open"},[t._v("On")]),t._v(" "),i("span",{attrs:{slot:"close"},slot:"close"},[t._v("Off")])])],1),t._v(" "),i("FormItem",{attrs:{"label-width":1}},[i("Button",{staticStyle:{"margin-right":"10px"},attrs:{type:"primary"},on:{click:function(e){t.handleSubmit("formValidate")}}},[t._v("保存")]),t._v(" "),i("Button",{staticStyle:{"margin-left":"8px"},attrs:{type:"ghost"},on:{click:function(e){t.handleReset("formValidate")}}},[t._v("重置")])],1)],1),t._v(" "),i("editor",{ref:"editor",attrs:{html:t.html}})],1)},staticRenderFns:[]};var d=i("Z0/y")(r,a,!1,function(t){i("7tKY")},"data-v-52d0381c",null);e.default=d.exports},cnC7:function(t,e,i){"use strict";var s=i("XzPx"),o=i.n(s),n=i("AA3o"),r=i.n(n),a=i("xSur"),d=i.n(a),l=function(){function t(e){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};r()(this,t),this.quill=e,this.options=i,this.handleClick=this.handleClick.bind(this),this.handleMousedown=this.handleMousedown.bind(this),this.handleMouseup=this.handleMouseup.bind(this),this.handleDrag=this.handleDrag.bind(this),this.checkImage=this.checkImage.bind(this),this.boxes=[],document.execCommand("enableObjectResizing",!1,"false"),this.quill.root.addEventListener("click",this.handleClick,!1)}return d()(t,[{key:"handleClick",value:function(t){if(t.target&&t.target.tagName&&"IMG"==t.target.tagName.toUpperCase()){if(this.img===t.target)return;this.img&&this.hide(),this.show(t.target)}else this.img&&this.hide()}},{key:"show",value:function(t){this.img=t,this.showResizers(),this.showSizeDisplay();var e=this.img.getBoundingClientRect();this.positionBoxes(e),this.positionSizeDisplay(e)}},{key:"hide",value:function(){this.hideResizers(),this.hideSizeDisplay(),this.img=void 0}},{key:"showResizers",value:function(){this.setUserSelect("none"),this.addBox("nwse-resize"),this.addBox("nesw-resize"),this.addBox("nwse-resize"),this.addBox("nesw-resize"),document.addEventListener("keyup",this.checkImage,!0),this.quill.root.addEventListener("input",this.checkImage,!0)}},{key:"hideResizers",value:function(){document.removeEventListener("keyup",this.checkImage),this.quill.root.removeEventListener("input",this.checkImage),this.setUserSelect(""),this.setCursor(""),this.boxes.forEach(function(t){return document.body.removeChild(t)}),this.dragBox=void 0,this.dragStartX=void 0,this.preDragWidth=void 0,this.boxes=[]}},{key:"addBox",value:function(t){var e=document.createElement("div"),i={position:"absolute",height:"12px",width:"12px",backgroundColor:"white",border:"1px solid #777",boxSizing:"border-box",opacity:"0.80",cursor:t};this.extend(e.style,i,this.options.handleStyles||{}),e.addEventListener("mousedown",this.handleMousedown,!1),document.body.appendChild(e),this.boxes.push(e)}},{key:"extend",value:function(t){for(var e=arguments.length,i=Array(e>1?e-1:0),s=1;s<e;s++)i[s-1]=arguments[s];return i.forEach(function(e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i])}),t}},{key:"positionBoxes",value:function(t){var e=this;[{left:t.left-6,top:t.top-6},{left:t.left+t.width-6,top:t.top-6},{left:t.left+t.width-6,top:t.top+t.height-6},{left:t.left-6,top:t.top+t.height-6}].forEach(function(t,i){e.extend(e.boxes[i].style,{top:Math.round(t.top+window.pageYOffset)+"px",left:Math.round(t.left+window.pageXOffset)+"px"})})}},{key:"handleMousedown",value:function(t){this.dragBox=t.target,this.dragStartX=t.clientX,this.preDragWidth=this.img.width||this.img.naturalWidth,this.setCursor(this.dragBox.style.cursor),document.addEventListener("mousemove",this.handleDrag,!1),document.addEventListener("mouseup",this.handleMouseup,!1)}},{key:"handleMouseup",value:function(){this.setCursor(""),document.removeEventListener("mousemove",this.handleDrag),document.removeEventListener("mouseup",this.handleMouseup)}},{key:"handleDrag",value:function(t){if(this.img){this.dragBox==this.boxes[0]||this.dragBox==this.boxes[3]?this.img.width=Math.round(this.preDragWidth-t.clientX-this.dragStartX):this.img.width=Math.round(this.preDragWidth+t.clientX-this.dragStartX);var e=this.img.getBoundingClientRect();this.positionBoxes(e),this.positionSizeDisplay(e)}}},{key:"setUserSelect",value:function(t){var e=this;["userSelect","mozUserSelect","webkitUserSelect","msUserSelect"].forEach(function(i){e.quill.root.style[i]=t,document.documentElement.style[i]=t})}},{key:"setCursor",value:function(t){[document.body,this.img,this.quill.root].forEach(function(e){return e.style.cursor=t})}},{key:"checkImage",value:function(){this.img&&this.hide()}},{key:"showSizeDisplay",value:function(){if(this.options.displaySize){this.display=document.createElement("div");this.extend(this.display.style,{position:"absolute",font:"12px/1.0 Arial, Helvetica, sans-serif",padding:"4px 8px",textAlign:"center",backgroundColor:"white",color:"#333",border:"1px solid #777",boxSizing:"border-box",opacity:"0.80",cursor:"default"},this.options.displayStyles||{}),document.body.appendChild(this.display)}}},{key:"hideSizeDisplay",value:function(){document.body.removeChild(this.display),this.display=void 0}},{key:"positionSizeDisplay",value:function(t){if(this.display&&this.img){var e=this.getCurrentSize();if(this.display.innerHTML=e.join(" &times; "),e[0]>120&&e[1]>30){var i=this.display.getBoundingClientRect();this.extend(this.display.style,{left:Math.round(t.left+t.width+window.pageXOffset-i.width-8)+"px",top:Math.round(t.top+t.height+window.pageYOffset-i.height-8)+"px"})}else this.extend(this.display.style,{left:Math.round(t.left+t.width+window.pageXOffset+8)+"px",top:Math.round(t.top+t.height+window.pageYOffset+8)+"px"})}}},{key:"getCurrentSize",value:function(){return[this.img.width,Math.round(this.img.width/this.img.naturalWidth*this.img.naturalHeight)]}}]),t}();i("zvoL");o.a.register("modules/imageResize",l);var h={name:"editor",props:{html:{type:String,default:""}},data:function(){return{content:this.html,editorOption:{modules:{toolbar:[["bold","italic","underline","strike"],["blockquote","code-block"],[{header:1},{header:2}],[{list:"ordered"},{list:"bullet"}],[{script:"sub"},{script:"super"}],[{indent:"-1"},{indent:"+1"}],[{direction:"rtl"}],[{size:["small",!1,"large","huge"]}],[{header:[1,2,3,4,5,6,!1]}],[{font:[]}],[{color:[]},{background:[]}],[{align:[]}],["clean"],["link","image"]],imageResize:{displaySize:!0}}}}},methods:{onEditorReady:function(t){},onEditorChange:function(t){}},computed:{editor:function(){return this.$refs.myQuillEditor.quill}},watch:{html:function(t,e){this.content=t}}},u={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"editor_container"}},[i("quill-editor",{ref:"myQuillEditor",attrs:{options:t.editorOption},on:{ready:function(e){t.onEditorReady(e)},change:function(e){t.onEditorChange(e)}},model:{value:t.content,callback:function(e){t.content=e},expression:"content"}})],1)},staticRenderFns:[]};var c=i("Z0/y")(h,u,!1,function(t){i("6Dmw")},"data-v-145a85e8",null);e.a=c.exports},mqq6:function(t,e,i){(t.exports=i("XLS9")(!0)).push([t.i,"","",{version:3,sources:[],names:[],mappings:"",file:"editor.vue",sourceRoot:""}])},vwmW:function(t,e,i){(t.exports=i("XLS9")(!0)).push([t.i,"\n.omsAddArticl_container[data-v-52d0381c] {\n  position: relative;\n  box-sizing: border-box;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  width: 100%;\n  padding: 20px;\n  background-color: #fff;\n}\n","",{version:3,sources:["G:/projects/vue-cli-demo/gqBlog/src/pages/omsAddArticle.vue"],names:[],mappings:";AACA;EACE,mBAAmB;EACnB,uBAAuB;EACvB,+BAA+B;EAC/B,4BAA4B;EAC5B,YAAY;EACZ,cAAc;EACd,uBAAuB;CACxB",file:"omsAddArticle.vue",sourcesContent:["\n.omsAddArticl_container[data-v-52d0381c] {\n  position: relative;\n  box-sizing: border-box;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  width: 100%;\n  padding: 20px;\n  background-color: #fff;\n}\n"],sourceRoot:""}])}});
//# sourceMappingURL=4.b8b9034d4e7027013efa.js.map