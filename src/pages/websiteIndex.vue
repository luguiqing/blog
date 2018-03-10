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
                    <Button type="primary" size="small" v-if="isLogin" @click="logout">登出</Button>
                    <Button type="primary" size="small" v-if="!isLogin" @click="login">登录</Button>
                    <Button type="primary" size="small" v-if="!isLogin">注册</Button>
                </div>
            </div>
        </div>
        <div class="app_content">
            <div class="content_left">
                <router-view></router-view>
            </div>
            <div class="content_right">
                <div class="user_container">
                    <div class="user_left"></div>
                    <div class="user_right">
                        <p style="text-align: left; margin-bottom: 8px;"><span style="font-size: 12px; background-color: #0090ce; color: #fff; padding: 3px 5px; margin-right: 8px;">博主: </span>River</p>
                        <p style="font-size: 12px;">桂清个人博客，记录自己的点滴。我的博客写的不好，不是因为我的写作能力不行，而是缺乏了经验！</p>
                    </div>
                </div>
                <div class="day_new">
                    <h2>今日资讯</h2>
                    <ul class="quick_look_content" style="padding-bottom: 5px; border-bottom: 1px solid #efefef;">
                        <li v-for="(item, index) in sightList" v-if="item.title" :key="index" :class="[sightStatus[index] ? 'show' :  '']" @click="togglesight(index)">
                            <span class="triangle"></span>
                            <div class="con">
                                <p class="title">{{item.title}}</p>
                                <div class="show-content">{{item.brief}}</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
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

export default {
    components: {
    },
    data(){
        return {
            time : new Date(),
            visible : false,//modal
            userName: '',//用户名
            password: '',
            sightList : [],
            sightStatus: []
        }
    },
    mounted(){
        let self = this;
        this.$ajax({
            method  : 'post',
            url     : '/Interface/getSight',
            data    :  {}
        }).then( result => {
            switch(result.data.retcode){
                case 0:
                    for(let i = 0; i < result.data.retdata.length; i++){
                        self.sightStatus.push(false);
                    }

                    self.sightList = result.data.retdata;
                    break;
            }
        }).catch( err => {
            console.log(err)
        })
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
            this.$ajax({
                method  : 'post',
                url     : '/Interface/editUserInfo',
                data    :  {
                }
            }).then( result => {
                switch(result.data.retcode){
                    case 0:
                        console.log(result.data)

                        self.$store.commit("updateLoginStatus", {isLogin : true})
                        self.visible = true;
                        break;
                }
            }).catch( err => {
                console.log(err)
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
                                    console.log(result.data)

                                    self.$store.commit("updateLoginStatus", {isLogin : true})
                                    self.visible = true;
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
@import "../styles/information.scss";
@import "../styles/websiteIndex.scss";
</style>
