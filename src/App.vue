<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
import Storage from './utils/storage'
import config from '../global/config'
export default{
    name: 'App',
    beforeMount(){
        let userInfo = Storage.getItem({ key : 'userInfo', type : 'object'});
        if(userInfo && userInfo.token && (Date.now()-userInfo.expires) < config.tokenObj.exp ){
            this.$store.commit("updateLoginStatus", {isLogin : true, userInfo : userInfo})
        }
    }
}
</script>
<style>
body, p, ul{
    margin: 0;
    padding: 0;
}
body{
    min-width: 1100px;
    max-width: 1920px;
    background-color: #f5f5f5!important;
}
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    /*position: relative;*/
}
.clearfix:after{
    content: '';
    display: block;
    clear: both;
    with: 0;
    height: 0;
    overflow: hidden;
}
.arrow{
    position: absolute;
    top: 50%;
    right: 15px;
    width: 15px;
    height:  15px;
    border-width: 2px 2px 0 0;
    border-color: #ccc;
    border-style: solid;
    transform: translateY(-50%) matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
}
</style>
