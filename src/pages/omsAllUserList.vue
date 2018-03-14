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
        <p v-if="modalClickType == 'deleteUser'" class="model_conten">确定删除用户"{{userName}}"?</p>
        <p v-if="modalClickType == 'controlStatus'" class="model_conten">确定{{userStatus == '1' ? '冻结' : '解冻'}}用户“{{userName}}”?</p>
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
            url     : '/Interface/getUserList',
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
                    name :  "用户",
                    value:  "userName"
                },
                {
                    name :  "注册时间",
                    value:  "createDate"
                }
            ],
            filter: function(data, searchType, searchValue){
                switch(searchType){
                    case 'userName':
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
                    title: '用户',
                    key: 'userName',
                    ellipsis: true
                },
                {
                    title: '注册时间',
                    key: 'createDate',
                    ellipsis: true
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
                                        self.userId = row['_id'];
                                        self.modalClickType = "controlStatus";
                                        self.modalStatus = true;
                                        self.userName = row['userName'];
                                        self.userStatus = row['status'];
                                    }
                                }
                            }, (row.status == '1' ? '冻结' : '解冻')),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: function(){
                                        self.userId = row['_id'];
                                        self.modalClickType = "deleteUser"
                                        self.modalStatus = true;
                                        self.userName = row['userName'];
                                    }
                                }
                            }, '删除')
                        ]);

                    }
                }
            ],
            modalStatus: false,
            modalClickType: '',
            userId: null,
            userName: '',
            userStatus: '2',//1为正常，2为冻结
        }
    },
    methods: {
        confirmModal(){
            let self = this;
            let status = this.userStatus == '1' ?  '2' : '1';
            switch(self.modalClickType){
                case 'controlStatus':
                   this.$ajax({
                        method  : 'post',
                        url     : '/Interface/changeUserStatus',
                        data    :  {
                            adminId    :   this.userInfo._id,
                            userId     :   this.userId,
                            status     :   status
                        }
                    }).then( result => {
                        switch(result.data.retcode){
                            case 0:
                                self.$Message.success(result.data.retmsg);
                                self.totalData.forEach((item, index) => {
                                    if(item._id === self.userId){
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
                case 'deleteUser':
                    this.$ajax({
                        method  : 'post',
                        url     : '/Interface/forceDeleteUser',
                        data    :  {
                            adminId     :   this.userInfo._id,
                            userId      :   this.userId
                        }
                    }).then( result => {
                        switch(result.data.retcode){
                            case 0:
                                self.$Message.success(result.data.retmsg);
                                self.totalData.forEach((item, index) => {
                                    if(item._id === self.userId){
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