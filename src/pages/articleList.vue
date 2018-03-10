<style scoped lang="sass">
.dashboard_container
    position: relative;
    height: 100px;
    background-color: red;

</style>
<template>
    <div class="dashboard_container">
        1
    </div>
</template>
<script>

export default {
    beforeMount() {
        let self = this;
    },
    data() {
        return {
        }
    },
    methods: {

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
