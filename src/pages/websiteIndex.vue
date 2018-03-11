<template>
    <div id="websiteIndex">
        <div class="app_header">
            <p class="app_time">今天是：{{time | formatDate}}</p>
            <a href="https://github.com/luguiqing" class="app_github">github</a>
        </div>
        <div class="app_navbar">
            <div class="navbar">
                <p style="color: #0090ce">River的博客系统</p>
                <div style="font-size: 0;">
                    <router-link :to="{name : 'omsAddArticle'}" v-if="isLogin" style="font-size: 14px; padding-right: 20px; vertical-align: middle;">进入管理后台>></router-link>
                    <Button type="primary" size="small" v-if="isLogin" @click="logout">登出</Button>
                    <Button type="primary" size="small" v-if="!isLogin" @click="login">登录</Button>
                    <Button type="primary" size="small" v-if="!isLogin">注册</Button>
                </div>
            </div>
        </div>
        <router-view></router-view>
        <Modal v-model="visible" width="460">
            <p slot="header" style="text-align:center;color:#0090ce; font-size: 20px;">用户登录</p>
            <div style="text-align:center; margin: 20px 0;">
                <Input v-model="userName" placeholder="用户名" clearable style="width: 400px; margin-bottom: 20px;"></Input>
                <Input v-model="password" placeholder="密码" clearable style="width: 400px"></Input>
            </div>
            <div slot="footer">
                <Button type="primary" size="large" long @click="submit('login')">登录</Button>
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
            password: ''
        }
    },
    mounted(){
        let self = this;
    },
    methods: {
        togglesight(index){
            this.$set(this.sightStatus, index, !this.sightStatus[index]);
        },
        login(){
            this.visible = true;
            //this.$store.commit("updateLoginStatus", {isLogin : true})
        },
        logout(){
            //this.$store.commit("updateLoginStatus", {isLogin : false})
            let self = this;
            this.$ajax({
                method  : 'post',
                url     : '/Interface/editUserInfo',
                data    :  {
                }
            }).then( result => {
                switch(result.data.retcode){
                    case 0:
                        console.log(result.data)

                        self.$store.commit("updateLoginStatus", {isLogin : false})
                        break;
                }
            })
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
                                    self.$store.commit("updateLoginStatus", {isLogin : true})
                                    self.visible = false;

                                    let userInfo = result.data.retdata;

                                    userInfo.token = result.data.retdata.token;
                                    userInfo.expires = Date.now();
                                    Storage.setItem({
                                        key     :       'userInfo',
                                        data    :        userInfo
                                    })
                                    break;
                            }
                        }).catch( err => {
                            console.log(err)
                        })
                    }else{
                        this.$Message.error("请完善登录信息！");
                    }
                    break
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
