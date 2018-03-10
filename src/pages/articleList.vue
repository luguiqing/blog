<style scoped lang="sass">
.dashboard_container
    position: relative;

</style>
<template>
    <div class="dashboard_container">
        <noResult v-if="articleList.length === 0" imgSrc="noArticle" title="没有文章" :des="isLogin ? '别偷懒啦，赶紧写几篇博客来看看！' : '暂时没有热门博客推荐'"></noResult>
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
            articleList: []
        }
    },
    methods: {

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
