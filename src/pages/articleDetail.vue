<style lang="scss">
.articleDetail_content .main{
    pre{
        padding: 5px;
        margin: 5px 0;
        background-color: #f5f5f5;
        border: 1px solid #ccc;
    }
    img{
        max-width: 100%;
    }
}
</style>
<template>
<div class="articleDetail_content">
    <div class="content_left">
        <div class="article_container">
            <h1 class="title">{{article.title}}</h1>
            <div class="header">
                <p>
                    <span v-if="article.userName && article.userName.length > 0">{{article.userName}} | </span>
                    <span>{{article.createDate|formatDate('HH:mm:ss')}}</span>
                </p>
                <p v-if="article.updateDate">最后修改于{{article.updateDate|formatDate('HH:mm:ss')}}</p>
            </div>
            <div class="brief">
                {{article.brief}}
            </div>
            <div class="main" v-html="article.content">
            </div>
        </div>
    </div>
    <div class="content_right">
        <a class="page_article" v-if="article.prev" :href="'/articleDetail?id='+article.prev._id">
            <h2 class="title">{{article.prev.title|formatStrByLen(25)}}</h2>
            <div class="time">
                <p>{{article.prev.createDate|formatDate('HH:mm:ss')}}</p>
                <div>
                    <span>上一篇</span>
                    <span class="triangle triangleL"></span>
                </div>
            </div>
        </a>
        <a class="page_article" v-if="article.next" :href="'/articleDetail?id='+article.next._id">
            <h2 class="title">{{article.next.title|formatStrByLen(25)}}</h2>
            <div class="time">
                <p>{{article.next.createDate|formatDate('HH:mm:ss')}}</p>
                <div>
                    <span>下一篇</span>
                    <span class="triangle triangleR"></span>
                </div>
            </div>
        </a>
    </div>
</div>
</template>
<script>

export default {
    components: {
    },
    data(){
        return {
            article: {}
        }
    },
    beforeMount(){
        let self = this;
        let articleId;
        console.log(this.$route)
        console.log(self.$route.query.id)
        if(self.$route.query.id){
            articleId = Number.parseInt(self.$route.query.id);

            this.$ajax({
                method  : 'post',
                url     : '/Interface/getHomeArticleDetail',
                data    :  {
                    articleId   :      articleId,
                    userId      :      this.userInfo ? this.userInfo._id : null
                }
            }).then( result => {
                self.loading = false;
                switch(result.data.retcode){
                    case 0:
                        self.article = result.data.retdata;
                        break;
                    default:
                        self.$Message.error(result.data.retmsg);
                        break;
                }
            })
        }else{
            self.$Message.error("缺失articleId")
        }
    },
    methods: {
    },
    computed: {
        isLogin(){
            return this.$store.getters.isLogin
        },
        userInfo(){
            return this.$store.getters.userInfo
        }
    }
}
</script>
<style scoped lang="scss">
@import "../styles/articleDetail.scss";
</style>