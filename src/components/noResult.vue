<style scoped lang="sass">
.noResult
    width: 100%;
    min-height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    >div
        text-align: center;
        padding: 0px 15px;
        color: #333;
        img
            width: 60%;
        h2
            font-size: 18px;
            padding-top: 13px;
            color: #f5b020;
        p
            font-size: 14px;
</style>
<template>
    <div class="noResult">
        <div>
            <img src="../assets/no_login.png" alt="" v-if="imgSrc === 'noLogin'">
            <img src="../assets/no_article.png" alt="" v-if="imgSrc === 'noArticle'">
            <h2>{{title}}</h2>
            <p>{{des}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "noResult",
    props:{
        title: {
            type : String,
            required: false
        },
        des: {
            type : String,
            required: false
        },
        imgSrc: {
            type : String,//图片地址如果在变量中，解析不了，可以放在静态文件中，也可用上述例子方法
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