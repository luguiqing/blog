<style scoped lang="scss">
@import "../styles/omsIndex.scss"
</style>
<style>
.menu_text_hidden .ivu-icon-ios-arrow-down:before{
    content: '';
}
.menu_text_hidden .ivu-menu-submenu-title{
    text-align: center;
}
</style>
<template>
    <div class="omsIndex_container">
        <Row class="colH" type="flex">
            <Col :span="spanLeft" class="colH colL">
                <Menu theme="dark" width="auto">
                    <Submenu v-for="(submenu, i) in menuList" :name="i" :key="i" :class="{'menu_text_hidden' : (spanLeft < 4)}">
                        <template slot="title">
                            <Icon :type="submenu.icon"></Icon>
                            <span class="span_text">{{submenu.title}}</span>
                        </template>
                        <MenuItem v-for="(item, index) in submenu.child" :name="item.name" :key="index" @click.native="navigator(item.name)">{{item.des}}</MenuItem>
                    </Submenu>
                </Menu>
                <div class="layout-copy">
                    2017-2018 &copy; blog.guiqingl.cn
                </div>
            </Col>
            <Col :span="spanRight" class="colH oms_right">
                <div class="oms_header">
                    <Icon class="iconLarge" type="arrow-swap" @click.native="toggle"></Icon>
                    <div class="header_right">
                        <span style="font-size: 12px; margin-right: 10px">欢迎登陆River博客管理系统</span>
                        <Button type="ghost" icon="arrow-return-left" size="small" style="margin-right: 8px;" @click="navigator('websiteArticleList')">返回首页</Button>
                        <Button type="ghost" icon="log-out" size="small" @click="logout">退出登录</Button>
                    </div>
                </div>
                <div class="oms_main">
                    <router-view></router-view>
                </div>
            </Col>
        </Row>
    </div>
</template>
<script>
import noResult from "../components/noResult"
import Storage from "../utils/storage"

export default {
    components: {
        noResult : noResult
    },
    beforeMount() {
        let self = this;
        //let userInfo = Storage.getItem({ key : 'userInfo', type : 'object'});

        if(this.userInfo && this.userInfo.auth == 2){
            this.menuList.map( (item) => {
                if(item.icon === 'ios-people'){
                    item.child.push({
                        name    :       'omsAllUserList',
                        des     :       '用户列表'
                    })
                }else if(item.icon === 'ios-paper'){
                    item.child.push({
                        name    :       "omsAllArticleList",
                        des     :       "全部文章"
                    });
                }
            })
        }
    },
    data() {
        return {
            spanLeft: 4,
            spanRight: 20,
            //activeName: 'omsUserArticleList',//激活的菜单name
            menuList: [
                {
                    icon    :   'ios-paper',
                    title   :   '内容管理',
                    child   :   [
                        {
                            name    :   "omsAddArticle",//到时直接this.$router.push({name : name})跳转
                            des     :   "新增随笔"
                        },
                        {
                            name    :   "omsUserArticleList",
                            des     :   "随笔列表"
                        },
                        {
                            name    :   "omsTag",
                            des     :   "标签管理"
                        }
                    ]
                },
                {
                    icon    :   'ios-people',
                    title   :   '用户管理',
                    child   :   [
                        {
                            name    :   "omsupdateUserInfo",//到时直接this.$router.push({name : name})跳转
                            des     :   "修改信息"
                        }
                    ]
                }
            ]
        }
    },
    methods: {
        toggle(){
            console.log('in')
            if(this.spanLeft == 2){
                this.spanLeft = 4;
                this.spanRight = 20;
            }else{
                this.spanLeft = 2;
                this.spanRight = 22;
            }
            console.log(this.isLogin)
        },
        navigator(routeName){
            if(routeName && routeName.length > 0){
                this.$router.push({name :  routeName})
            }else{
                this.$$Message.error('路由不存在！');
            }
        },
        logout(){
            let self = this;
            this.$ajax({
                method  : 'post',
                url     : '/Interface/logout',
                data    :  {
                }
            }).then( result => {
                switch(result.data.retcode){
                    case 0:
                        self.$store.commit("updateLoginStatus", {isLogin : false, userInfo : null});
                        Storage.removeItem('userInfo');
                        self.$router.push({path : '/'});
                        break;
                    default:
                        self.$Message.error(result.data.retmsg);
                        break;
                }
            })
        }
    },
    computed: {
        isLogin(){
            return this.$store.getters.isLogin
        },
        userInfo(){
            return this.$store.getters.userInfo
        }
    },
    watch: {

    }
}

</script>
