<style scoped lang="scss">
.omsAddArticl_container{
    position: relative;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    width: 100%;
    padding: 20px;
    background-color: #fff;
}
</style>
<template>
    <div class="omsAddArticl_container">
        <Form :model="formItem" :label-width="70" :rules="ruleValidate" ref="formValidate">
            <FormItem label="文章标题" prop="title">
                <Input v-model="formItem.title" placeholder="Enter title..."></Input>
            </FormItem>
            <FormItem label="文章简介" prop="brief">
                <Input v-model="formItem.brief" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter brief..."></Input>
            </FormItem>
            <FormItem label="对外开放">
                <i-switch v-model="formItem.status" size="large">
                    <span slot="open">On</span>
                    <span slot="close">Off</span>
                </i-switch>
            </FormItem>
            <FormItem :label-width="1">
                <Button type="primary" @click="handleSubmit('formValidate')" style="margin-right: 10px;">保存</Button>
                <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
            </FormItem>
        </Form>
        <editor ref="editor" :html="html"></editor>
    </div>
</template>
<script>
import Storage from "../utils/storage"
import editor from "../components/editor.vue"

export default {
    components: {
        editor : editor
    },
    beforeMount() {
        let self = this;
        this.userInfo = Storage.getItem({ key : 'userInfo', type : 'object'});

        if(this.$route.query && this.$route.query.id){
            this.articleId = Number.parseInt(this.$route.query.id);
            self.$ajax({
                method  : 'post',
                url     : '/Interface/getArticleDetail',
                data    :  {
                    articleId   :   self.articleId,
                    userId      :   self.userInfo._id
                }
            }).then( result => {
                switch(result.data.retcode){
                    case 0:
                        self.formItem.title = result.data.retdata.title;
                        self.formItem.brief = result.data.retdata.brief;
                        self.html = result.data.retdata.content;
                        self.formItem.status = result.data.retdata.status === 0 ? false : true;
                        self.$Message.success('加载文章内容成功');
                        break;
                    default:
                        self.$Message.error(result.data.retmsg);
                        break;
                }
            })
        }
    },
    data() {
        return {
            formItem: {
                title: '',
                brief: '',
                status: true//文章是否对外开放
            },
            ruleValidate: {
                title: [
                    { required: true, message: 'The title cannot be empty', trigger: 'blur' }
                ],
                brief: [
                    { required: true, message: 'The brief cannot be empty', trigger: 'blur' }
                ]
            },
            articleId: null,
            userInfo: null,
            html : ''
        }
    },
    methods: {
        handleSubmit (name) {
            let self = this;
            //console.log(this.$refs['editor']['content'])
            if(self.$refs['editor']['content'].length > 0){
                self.$refs[name].validate((valid) => {
                    if (valid) {
                        let ajaxData = {
                            title   :   self.formItem.title,
                            brief   :   self.formItem.brief,
                            status  :   self.formItem.status ? 1 : 0,
                            content :   self.$refs['editor']['content'],
                            userId  :   self.userInfo._id
                        }
                        if(self.articleId !== null){
                            ajaxData.articleId = self.articleId;
                        }
                        self.$ajax({
                            method  : 'post',
                            url     : '/Interface/addArticle',
                            data    :  ajaxData
                        }).then( result => {
                            switch(result.data.retcode){
                                case 0:
                                    console.log(result.data)
                                    self.$Message.success('保存文章成功');
                                    break;
                                default:
                                    self.$Message.error(result.data.retmsg);
                                    break;
                            }
                        })
                    } else {
                        self.$Message.error('请完善信息！');
                    }
                })
            }else{
                self.$Message.error('请完善信息！');
            }
        },
        handleReset (name) {
            this.$refs[name].resetFields();
            this.html = '';
        }
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
