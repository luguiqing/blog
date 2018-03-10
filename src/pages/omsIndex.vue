<style scoped lang="scss">
.omsIndex_container{
    position: absolute;
    width: 100%;
    height: 100%;
    .colH{
        height: 100%;
    }
    .colL{
        background: #495060;
    }
    .iconLarge{
        font-size: 30px;
    }
    .ivu-col {
        position: relative;
        transition: width .2s ease-in-out;
    }
    .menu_text_hidden{
        .span_text{
            display: none;
        }
    }
    .layout-copy{
        position: absolute;
        bottom: 20px;
        width: 100%;
        font-size: 12px;
        left: 0px;
        text-align: center;
        color: #9ea7b4;
    }
    //header
    .oms_header{
        display: flex;
        height: 50px;
        justify-content: space-between;
        align-items: center;
        padding: 0px 20px;
        font-size: 14px;
        color: #333;
        background-color:#fff;
    }
}
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
                        <MenuItem v-for="(item, index) in submenu.child" :name="item.name" :key="index">{{item.des}}</MenuItem>
                    </Submenu>
                </Menu>
                <div class="layout-copy">
                    2017-2018 &copy; blog.guiqingl.cn
                </div>
            </Col>
            <Col :span="spanRight" class="colH">
                <div class="oms_header">
                    <Icon class="iconLarge" type="arrow-swap" @click.native="toggle"></Icon>
                    <div class="header_right">
                        <span style="font-size: 12px; margin-right: 10px">欢迎登陆River博客管理系统</span>
                        <Button type="ghost" icon="log-out" size="small">退出登录</Button>
                    </div>
                </div>
            </Col>
        </Row>
    </div>
</template>
<script>
import noResult from "../components/noResult"

export default {
    components: {
        noResult : noResult
    },
    beforeMount() {
        let self = this;
    },
    data() {
        return {
            spanLeft: 4,
            spanRight: 20,
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
                            name    :   "omsArticleList",
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
                            name    :   "omsPeopleList",//到时直接this.$router.push({name : name})跳转
                            des     :   "用户管理"
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
        }
    },
    computed: {
        isLogin(){
            return this.$store.getters.isLogin
        }
    },
    watch: {

    }
}

</script>
