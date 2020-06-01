<style scoped lang="less">
	.alert-con {
		height: 3rem;
		width: 80%;
		margin: auto;
	}
   
</style>

<template>
    <layer>
        <view class="alert-con">消息提示</view>
    </layer>
</template>

<script>
    export default {
        name: 'contact',

        props: ['contactList'],

        components: {
            layer
        },

        data() {
            return {
             
            }
        },

        methods: {
        
        }

    }
</script>


