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
        @on-ok="deleteArticle">
        <Icon type="ios-information" class="warn_icon"></Icon>
        <p class="model_conten">确定删除文章 {{articleTitle}}?</p>
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
        let userInfo = Storage.getItem({ key : 'userInfo', type : 'object'});
        this.userInfo = userInfo;

        this.$ajax({
            method  : 'post',
            url     : '/Interface/getArticleListById',
            data    :  {
                userId  :   userInfo._id
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
                                        //console.log(row['_id']),文章id
                                        self.$router.push({name : 'omsAddArticle', query : {id : row['_id']}})
                                    }
                                }
                            }, '修改'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: function(){
                                        self.articleID = row['_id'];
                                        self.modalStatus = true;
                                        self.articleTitle = row['title'];
                                    }
                                }
                            }, '删除')
                        ]);

                    }
                }
            ],
            userInfo: null,
            modalStatus: false,
            articleID: null,
            articleTitle: ''
        }
    },
    methods: {
        deleteArticle(){

        }
    },
    computed: {

    }
}
</script>