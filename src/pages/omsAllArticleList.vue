<style scoped lang="scss">
.omsUserArticleList_container{
    position: relative;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    width: 100%;
    padding: 20px;
    background-color: #fff;
}
.warn_icon{
    display: inline-block;
    color: #ff9900;
    font-size: 24px;
    vertical-align: middle;
}
.model_conten{
    display: inline-block;
    margin-left: 10px;
}
</style>
<template>
<div class="omsUserArticleList_container">
    <myTable :searchList="searchList" :columns="columns" :totalData="totalData" :filter="filter" :loading="loading" :pageSize="10"></myTable>
    <Modal
        v-model="modalStatus"
        title="操作"
        @on-ok="confirmModal">
        <Icon type="ios-information" class="warn_icon"></Icon>
        <p v-if="modalClickType == 'deleteArticle'" class="model_conten">确定删除文章"{{articleTitle}}"?</p>
        <p v-if="modalClickType == 'controlHot'" class="model_conten">确定{{articleStatus ? '不' : ''}}将文章“{{articleTitle}}”其推荐到热门博客?</p>
    </Modal>
</div>
</template>
<script>
import Storage from "../utils/storage"
import myTable from '../components/myTable.vue'
import Util from '../utils/util'

export default {
    components: {
        myTable : myTable
    },
    beforeMount() {
        let self = this;

        this.$ajax({
            method  : 'post',
            url     : '/Interface/getAllArticleList',
            data    :  {
                userId  :   this.userInfo._id
            }
        }).then( result => {
            self.loading = false;
            switch(result.data.retcode){
                case 0:
                    //console.log(result.data)
                    result.data.retdata.forEach( (item, index) => {
                        if(item.createDate){
                            item.createDate = Util.formatDate(item.createDate);
                        }
                        if(item.updateDate){
                            item.updateDate = Util.formatDate(item.updateDate)
                        }
                    });
                    self.totalData = result.data.retdata;
                    break;
                default:
                    self.$Message.error(result.data.retmsg);
                    break;
            }
        })
    },
    data(){
        let self = this;
        return {
            //table -- props
            searchList: [
                {
                    name :  "标题",
                    value:  "title"
                },
                {
                    name :  "发布时间",
                    value:  "createDate"
                }
            ],
            filter: function(data, searchType, searchValue){
                switch(searchType){
                    case 'title':
                        return data[searchType].indexOf(searchValue) > -1 ? true : false;
                        break;
                    case 'createDate':
                        return data[searchType].indexOf(searchValue) > -1 ? true : false;
                        break;
                }
            },
            loading: true,//数据加载中
            totalData: [],
            columns: [
                {
                    title: 'Id',
                    key: '_id',
                    sortable: true
                },
                {
                    title: '文章标题',
                    key: 'title',
                    ellipsis: true
                },
                {
                    title: '作者',
                    key: 'userName',
                    ellipsis: true
                },
                {
                    title: '发布时间',
                    key: 'createDate',
                    ellipsis: true
                },
                {
                    title: '修改时间',
                    key: 'updateDate',
                    ellipsis: true
                },
                {
                    title: '标签',
                    key: 'tagId',
                    ellipsis: true,
                    render: (h, params) => {
                        const row = params.row;
                        if(row['tagId'].length > 0){
                            //todo,暂时没写标签
                        }else{
                            return h('div', {
                                props: {
                                    color: '#333'
                                }
                            }, '未分类');
                        }

                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    render: (h, params) => {
                        const row =params.row
                        return h('div', {
                            props: {
                                color: '#333'
                            }
                        }, [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style:{
                                    marginRight: '5px'
                                },
                                on: {
                                    click: function(){
                                        self.articleId = row['_id'];
                                        self.modalClickType = "controlHot";
                                        self.modalStatus = true;
                                        self.articleTitle = row['title'];
                                        self.articleStatus = row['status'];
                                    }
                                }
                            }, (row.status == 1 ? '隐藏' : '显示')),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: function(){
                                        self.articleId = row['_id'];
                                        self.modalClickType = "deleteArticle"
                                        self.modalStatus = true;
                                        self.articleTitle = row['title'];
                                    }
                                }
                            }, '删除')
                        ]);

                    }
                }
            ],
            modalStatus: false,
            modalClickType: '',
            articleId: null,
            articleTitle: '',
            articleStatus: 0
        }
    },
    methods: {
        confirmModal(){
            let self = this;
            let status = this.articleStatus ? 0 : 1;
            switch(self.modalClickType){
                case 'controlHot':
                   this.$ajax({
                        method  : 'post',
                        url     : '/Interface/changeArticleStatus',
                        data    :  {
                            userId    :   this.userInfo._id,
                            articleId :   this.articleId,
                            status    :   status
                        }
                    }).then( result => {
                        switch(result.data.retcode){
                            case 0:
                                self.$Message.success(result.data.retmsg);
                                self.totalData.forEach((item, index) => {
                                    if(item._id === self.articleId){
                                        self.$set(item, 'status', status)
                                    }
                                })
                                break;
                            default:
                                self.$Message.error(result.data.retmsg);
                                break;
                        }
                    })
                break;
                case 'deleteArticle':
                    this.$ajax({
                        method  : 'post',
                        url     : '/Interface/forceDeleteArticle',
                        data    :  {
                            userId    :   this.userInfo._id,
                            articleId :   this.articleId
                        }
                    }).then( result => {
                        switch(result.data.retcode){
                            case 0:
                                self.$Message.success(result.data.retmsg);
                                self.totalData.forEach((item, index) => {
                                    if(item._id === self.articleId){
                                        self.totalData.splice(index,1);
                                    }
                                })
                                break;
                            default:
                                self.$Message.error(result.data.retmsg);
                                break;
                        }
                    })
                    break;

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
    }
}
</script>