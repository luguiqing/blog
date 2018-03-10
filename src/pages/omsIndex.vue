<style scoped lang="sass">
.dashboard_container
    position: relative;

</style>
<template>
    <div class="dashboard_container">
        44
        <noResult v-if="!isLogin" imgSrc="noLogin" title="请先登录" des="想浏览博客内容，请先登录！"></noResult>
        <noResult v-if="isLogin" imgSrc="noArticle" title="没有文章" des="赶紧去联系博主，让他别偷懒了！"></noResult>
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
