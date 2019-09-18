<template>
    <div id="websiteIndex">
        <div class="app_header">
            <p class="app_time">今天是：{{time | formatDate('dddd')}}</p>
            <a href="https://github.com/luguiqing" class="app_github">github</a>
        </div>
        <div class="app_navbar">
            <div class="navbar">
                <a style="display: block; color: #0090ce; font-family: Comic Sans MS,cursive;" href="/">River的博客系统</a>
                <div style="font-size: 0;">
                    <router-link :to="{name : 'omsUserArticleList'}" v-if="isLogin" style="font-size: 14px; padding-right: 20px; vertical-align: middle;">进入管理后台>></router-link>
                    <Button type="primary" size="small" v-if="isLogin" @click="logout('logout')">登出</Button>
                    <Button type="primary" size="small" v-if="!isLogin" @click="login('login')">登录</Button>
                    <Button type="primary" size="small" v-if="!isLogin" @click="register('register')">注册</Button>
                </div>
            </div>
        </div>
        <router-view></router-view>
        <div class="footer">
          <a href="http://www.beian.miit.gov.cn" target="_blank" rel="nofollow" class="slide slide-ct" hotrep="hp.footer.bottom.miitbeian">粤ICP备17126492号-1</a>
        </div>
        <Modal v-model="visible" width="460">
            <p slot="header" style="text-align:center;color:#0090ce; font-size: 20px;">用户{{clickType === 'register' ? '注册' : '登录'}}</p>
            <div style="text-align:center; margin: 20px 0;">
                <Input v-model="userName" placeholder="用户名" clearable style="width: 400px; margin-bottom: 20px;"></Input>
                <Input v-model="password" type="password" placeholder="密码" clearable style="width: 400px"></Input>
                <Input v-model="passwordAgain" type="password" placeholder="确认密码" v-if="clickType === 'register'" clearable style="width: 400px; margin-top: 20px;"></Input>
            </div>
            <div slot="footer">
                <Button type="primary" size="large" long @click="submit(clickType)">{{clickType === 'register' ? '注册' : '登录'}}</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
import Storage from '../utils/storage';

export default {
    components: {
    },
    data(){
        return {
            time : new Date(),
            visible : false,//modal
            userName: '',//用户名
            password: '',
            passwordAgain: '',
            clickType: ''
        }
    },
    mounted(){
        let self = this;
    },
    methods: {
        togglesight(index){
            this.$set(this.sightStatus, index, !this.sightStatus[index]);
        },
        clearModal(){
            this.password = '';
            this.passwordAgain = '';
            this.userName = '';
        },
        login(type){
            this.clickType = type;
            this.visible = true;
            _hmt.push(['_trackEvent', '登录', '打开登录弹窗'])
        },
        logout(type){
            let self = this;
            this.clickType = type;
            _hmt.push(['_trackEvent', '退出', '退出登录'])
            this.$ajax({
                method  : 'post',
                url     : '/Interface/logout',
                data    :  {
                }
            }).then( result => {
                switch(result.data.retcode){
                    case 0:
                        self.$store.commit("updateLoginStatus", {isLogin : false, userInfo : null})
                        Storage.removeItem('userInfo');
                        break;
                    default:
                        self.$Message.error(result.data.retmsg);
                        break;
                }
            })
        },
        register(type){
            this.clickType = type;
            this.visible = true;
            _hmt.push(['_trackEvent', '注册', '打开注册弹窗'])
        },
        submit(type){
            let self = this;
            switch(type){
                case 'login':
                    if(this.userName.length>0 && this.password.length>0){
                        this.$ajax({
                            method  : 'post',
                            url     : '/Interface/login',
                            data    :  {
                                userName    :     this.userName,
                                password    :     this.password
                            }
                        }).then( result => {
                            switch(result.data.retcode){
                                case 0:
                                    self.visible = false;
                                    self.clearModal();
                                    let userInfo = result.data.retdata;

                                    userInfo.token = result.data.retdata.token;
                                    userInfo.expires = Date.now();
                                    self.$store.commit("updateLoginStatus", {isLogin : true, userInfo : userInfo});
                                    Storage.setItem({
                                        key     :       'userInfo',
                                        data    :        userInfo
                                    })
                                    break;
                                default:
                                    self.$Message.error(result.data.retmsg);
                            }
                        })
                    }else{
                        this.$Message.error("请完善登录信息！");
                    }
                    break
                case 'register':
                    if(this.userName.length>0 && this.password.length>0 && this.passwordAgain.length){
                        if(this.passwordAgain !== this.password){
                            this.$Message.error("输入的密码不一致！");
                        }else{
                           this.$ajax({
                                method  : 'post',
                                url     : '/Interface/register',
                                data    :  {
                                    userName    :     this.userName,
                                    password    :     this.password
                                }
                            }).then( result => {
                                switch(result.data.retcode){
                                    case 0:
                                        self.visible = false;
                                        self.clearModal();
                                        let userInfo = result.data.retdata;

                                        userInfo.token = result.data.retdata.token;
                                        userInfo.expires = Date.now();
                                        self.$store.commit("updateLoginStatus", {isLogin : true, userInfo : userInfo});
                                        Storage.setItem({
                                            key     :       'userInfo',
                                            data    :        userInfo
                                        })
                                        break;
                                    default:
                                        self.$Message.error(result.data.retmsg);
                                }
                            })
                        }
                    }else{
                        this.$Message.error("请完善注册信息！");
                    }
                    break;
            }
        }
    },
    computed: {
        isLogin(){
            return this.$store.getters.isLogin
        }
    }
}
</script>
<style scoped lang="scss">
@import "../styles/websiteIndex.scss";
</style>
