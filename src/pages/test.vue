<style scoped lang="scss">
.no_find{
    width: 80%;
    margin: 100px auto;
    font-size: 20px;
    color: #333;
    text-align: center;
}
</style>
<template>
    <div class="no_find">
        <Input v-model="phones" placeholder="Enter phones..."></Input>
        <br>
        <br>
        <Input v-model="authorization" placeholder="Enter authorization..."></Input>
        <br>
        <div v-if="errMsg" class="err">失败的号码：{{errMsg}}</div>
        <br>
        <Button type="ghost" @click="make" style="margin-top: 100px">提及</Button>
    </div>
</template>
<script>

export default {
    data(){
        return {
            authorization: '',
            phones: '[18317265079, 13706419011]',
            errMsg: '',
            sumbit: false
        }
    },
    mounted(){
        // this.make();
    },
    methods: {
        async make(){
            let phones;
            try{
                phones = JSON.parse(this.phones)   
            }catch(err){
                this.$Message.error("输入该格式: [18317265079]");
                return;
            }
            // if(!this.authorization) {
            //     this.$Message.error("请输入: 登陆态数据");
            //     return;
            // }
            if(this.sumbit){
                this.$Message.error("别重复提交");
                return;
            }
            this.sumbit = true;
            const res = await this.$ajax({
                method  : 'post',
                url     : '/Interface/test',
                data    :  {
                    authorization  :  this.authorization || 'd2c01fad-c11f-44b5-8d60-80a4cb34bd51',
                    phones: phones
                }
            })
            this.sumbit = false;
            this.errMsg = JSON.stringify(res.data.retdata)
        }
    }
}

</script>
