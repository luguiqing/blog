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
            this.$store.commit("updateLoginStatus", {isLogin : true})
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
    min-width: 1000px;
    max-width: 1920px;
    background-color: #f5f5f5;
}
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    /*position: relative;*/
}
</style>
