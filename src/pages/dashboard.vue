<template>
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
</template>
<script>

export default {
    components: {
    },
    data(){
        return {
            sightList : [],
            sightStatus: []
        }
    },
    beforeCreate(){
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
        }
    },
    computed: {

    }
}
</script>
<style scoped lang="scss">
@import "../styles/information.scss";
@import "../styles/dashboard.scss";
</style>