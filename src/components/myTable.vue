<style scoped lang="scss">
.table_container{
    position: relative;
    .header{
        text-align: right;
        .search_input{
            width: 300px;
            float: right;
        }
    }
    .table{
        margin-top: 30px;
    }
    .footer{
        margin-top: 20px;
        .page{
            float: right;
        }
    }
}
</style>
<template>
<div class="table_container">
    <div class="header clearfix" v-if="hasSearch">
        <Input v-model="searchValue" icon="ios-search" class="search_input" @on-enter="search" @on-click="search">
            <Select v-model="searchType" slot="prepend" style="width: 80px">
                <Option v-for="(item, index) in searchList" :value="item.value" :key="index">{{item.name}}</Option>
            </Select>
        </Input>
    </div>
    <div class="table">
        <Table :data="tableData" :columns="columns" :loading="loading" stripe></Table>
    </div>
    <div class="footer clearfix">
        <Page :total="searchData.length" show-total class="page" :page-size="pageSize" @on-change="changePage" :current="currentPage"></Page>
    </div>
</div>
</template>
<script>

export default {
    name: 'myTable',
    /*
    *@param     totalData     全部数据
    *@param     searchList    头部筛选框数组
    *@param     columns       自定义表格配置
    *@param     pageSize      每页数据量
    *@param     loading       显示加载中
    *@param     filter（item, searchType, searchValue）     头部筛选框函数，返回Boolean
    */
    props: {
        totalData: {
            type: Array,
            default: () => {
                return []
            }
        },
        searchList: {
            type: Array,
            default: () => {
                return []
            }
        },
        filter: Function,
        columns: {
            type: Array,
            require: true
        },
        pageSize: {
            type: Number,
            default: 10
        },
        loading: {//table加载中
            type: Boolean,
            default: false
        }
    },
    data(){
        return {
            searchValue: '',
            searchType: '',
            tableData: [],//用于分页显示
            currentPage: 1,
            searchData: [],//用于存储筛选的全部数据
        }
    },
    mounted(){
        let self = this;
        if(this.searchList.length > 0){
            this.searchType = this.searchList[0]['value'];
        }

    },
    methods: {
        changePage(index){
            this.currentPage = index;
            let sliceNum = this.arrSlice();

            this.tableData = this.searchData.slice(sliceNum.start, sliceNum.end);
        },
        //裁剪工具
        arrSlice(){
            let start, end, index;
            index = this.currentPage - 1;

            start = index * this.pageSize;
            end = start + this.pageSize;
            return {
                start,
                end
            }

        },
        search(){
            if(this.searchValue.length > 0){
                if(typeof this.filter === 'function'){
                    this.searchData = this.totalData.filter(item => {
                        return this.filter(item, this.searchType, this.searchValue);
                    })
                    //初始化数据
                    this.changePage(1);

                }else{
                    this.$Message.error("没定义筛选函数！")
                }
            }else{
                this.searchData = [];
                this.searchData = Array.concat(this.totalData);
                this.changePage(1);
            }
        }
    },
    computed: {
        hasSearch(){
            return this.searchList.length > 0;
        }
    },
    watch: {
        totalData(newVal, oldVal){
            let sliceNum = this.arrSlice();
            this.searchData = [];
            this.searchData = Array.concat(newVal);
            this.tableData = this.searchData.slice(sliceNum.start, sliceNum.end);
        }
    }
}
</script>