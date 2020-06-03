<style scoped lang="less">
    @bgColor: rgb(242,242,242);

    .message-container {
        width: 90%;
        margin: auto;
    }

    .message-title {
        @titleHeight: 2rem;
        height: @titleHeight;
        text-align: center;
        line-height: @titleHeight;
    }

    .message-content {

    }

    .time {
        .message-title;
        text-align: right !important;
    }


</style>

<template>
    <view class="message-container">
        <view class="message-title">{{title}}</view>
        <view class="message-content">{{content}}</view>
        <view class="time">{{time}}</view>
    </view>
</template>

<script>
    import {myApi} from "@/utils/apiManager/myApi";
    import {errorCode} from "@/utils/errorCode/errorCode";

    export default {
        name: 'message',

        computed: {},

        data() {
            return {
                id: '',
                title: '',
                content: '',
                time: '',
                isRead: ''
            }
        },

        onLoad(option) {
            this.id = option.id
            this.getNotice()
        },

        methods: {
            getNotice() {
                myApi.getSingleMessage(this.id).then(res => {
                    console.log(res)
                    if (res.code == 1) {
                        this.title = res.data.title
                        this.content = res.data.content
                        this.time = res.data.time
                        if (!res.data.isRead) {
                            this.setRead()
                        }
                    } else {
                        errorCode(res)
                    }
                })
            },

            setRead() {
                myApi.setMessageRead(this.id).then(res => {
                    if (res.code == 1) {
                        console.log('设置成功')
                    } else {
                        errorCode(res)
                    }
                })
            }
        }


    }
</script>


