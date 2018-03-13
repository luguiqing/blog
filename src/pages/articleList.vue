<style scoped lang="sass">
.dashboard_container
    position: relative;
    .breadcrumb
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        color: #999;
    .loadMore
        text-align: center;
        margin-top: 30px;
</style>
<template>
    <div class="dashboard_container">
        <p class="breadcrumb">{{breadcrumb}}</p>
        <noResult v-if="articleList.length === 0" imgSrc="noArticle" title="没有文章" :des="isLogin ? '别偷懒啦，赶紧写几篇博客来看看！' : '暂时没有热门博客推荐'"></noResult>
        <Article v-for="(article, index) in articleList" :key="index" :article="article"></Article>
        <div class="loadMore">
            <Button v-if="hasMore" type="primary" :loading="loading" @click="loadMore">
                <span v-if="!loading">加载更多</span>
                <span v-else>加载中...</span>
            </Button>
        </div>
    </div>
</template>
<script>
import noResult from "../components/noResult"
import Article from "../components/article"

export default {
    components: {
        noResult : noResult,
        Article : Article
    },
    beforeMount() {
        let self = this;
        if(this.userInfo){
            this.breadcrumb = this.userInfo.userName + "的博客";
            this.getArticleListByPageAndId();
        }else{
            this.getHotArticleList();
        }
    },
    data() {
        return {
            articleList: [],
            breadcrumb: '热门博客',
            pageSize: 5,//每次加载数量
            page: 0,//页数,从1开始算起
            loading: false,
            hasMore: true//控制加载按钮的显示
        }
    },
    methods: {
        getHotArticleList(){
            let self = this;
            this.page += 1;
            this.$ajax({
                method  : 'post',
                url     : '/Interface/getHotArticleList',
                data    :  {
                    pageSize   :   this.pageSize,
                    page       :   this.page
                }
            }).then( result => {
                self.loading = false;
                switch(result.data.retcode){
                    case 0:
                        if(result.data.retdata.length < self.pageSize){
                            self.hasMore = false;
                        }
                        self.articleList = self.articleList.concat(result.data.retdata);
                        break;
                    default:
                        self.$Message.error(result.data.retmsg);
                        break;
                }
            })
        },
        getArticleListByPageAndId(){
            let self = this;
            this.page += 1;
            this.$ajax({
                method  : 'post',
                url     : '/Interface/getArticleListByPageAndId',
                data    :  {
                    pageSize   :   this.pageSize,
                    page       :   this.page,
                    userId     :   this.userInfo._id
                }
            }).then( result => {
                self.loading = false;
                switch(result.data.retcode){
                    case 0:
                        if(result.data.retdata.length < self.pageSize){
                            self.hasMore = false;
                        }
                        self.articleList = self.articleList.concat(result.data.retdata);
                        break;
                    default:
                        self.$Message.error(result.data.retmsg);
                        break;
                }
            })
        },
        loadMore(){
            this.loading = true;
            if(this.userInfo){
                this.getArticleListByPageAndId();
            }else{
                this.getHotArticleList();
            }
        }
    },
    computed: {
        isLogin(){
            return this.$store.getters.isLogin
        },
        userInfo(){
            return this.$store.getters.userInfo
        }
    },
    watch: {
        isLogin(newVal, oldVal){
            if(!newVal){
                //中途退出
                this.breadcrumb = "热门博客";
                this.hasMore = true;
                this.page = 0;
                this.articleList = [];
                this.getHotArticleList();
            }else{
                //中途登录
                this.breadcrumb = this.userInfo.userName + "的博客";
                this.hasMore = true;
                this.page = 0;
                this.articleList = [];
                this.getArticleListByPageAndId();
            }
        }
    }
}

</script>
