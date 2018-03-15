<style scoped lang="sass">
.article_container
    position: relative;
    display: block;
    margin: 0px 0px 20px;
    height: 190px;
    padding: 20px 30px 20px 20px;
    background-color: #fff;
    border: 0px solid #ddd;
    border-bottom-width: 1px;
    border-top-width: 1px;
    //border-bottom-color: #ddd;
    //border-top-color: #ddd;
    border-left-width: 3px;
    border-left-color: transparent;
    &:hover
        background-color: #F8FCFE;
        border-left-width: 3px;
        border-left-color: #2d8cf0;
    .title
        font-size: 24px;
        color: #333;
        width: 100%;
        max-height: 40px;
        height: 40px;
        margin-bottom: 5px;
        transition: margin-left .3s;
        -moz-transition: margin .3s;
        -webkit-transition: margin .3s;
        -o-transition: margin .3s;
        -webkit-line-clamp: 1;
        &:hover
            margin-left: 10px;
            color: #57a3f3;
    .brief
        font-size: 14px;
        color: #999;
        -webkit-line-clamp: 4;
        line-height: 20px;
        max-height: 80px;
        &:hover
            color: #398E9F;
    .ellipsis
        overflow: hidden;
        text-overflow: ellipsis;
        text-overflow: -o-ellipsis-lastline;
        display: -webkit-box;
        -webkit-box-orient: vertical;
    .user_info
        position: absolute;
        bottom: 15px;
        right: 15px;
        font-size: 12px;

</style>
<template>
    <a class="article_container" :href="'/articleDetail?id='+article._id">
        <p class="title ellipsis">{{article.title}}</p>
        <p class="brief ellipsis">{{ article.brief | formatStrByLen(160) }}</p>
        <div class="user_info">
            <span v-if="article.userName&&article.userName.length>0">{{article.userName}} |</span>
            <span>{{article.createDate|formatDate('HH:mm:ss')}}</span>
        </div>
        <div class="arrow"></div>
    </a>
</template>

<script>
export default {
    name: "Article",
    props:{
        article: {
            type : Object,
            required: true
        }
    },
    data () {
        return {
        }
    },
    methods: {

    },
    computed: {
    }
}
</script>