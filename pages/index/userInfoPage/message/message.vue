<style scoped lang="less">
    @bgColor: rgb(242,242,242);
    .bottom-con {
        width: 90%;
        margin: auto;
        .message-card {
            @messageBox: 4rem;
            @item: 2;
            height: @messageBox;
            font-size: 0.3rem;
            border-bottom: 1px solid @bgColor;
            border-top: 1px solid @bgColor;
            margin-bottom: 1rem;

            .message-title {
                display: flex;
                flex-direction: row;
                align-items: center;
                height: 50%;
                line-height: @messageBox / @item;
            }

            .message-title-inner {
                font-size: 0.8rem;
                height: 100%;
                text-align: left;
                line-height: @messageBox / @item;
                width: 50%;
            }

            .message-title view {
                width: calc(100% - 50%);
                font-size: 0.7rem;
                text-align: center;
            }

            .message-content {
                height: 50%;
                font-size: 0.7rem;
                line-height: @messageBox / @item;
            }

            .isRead {
                height: 1.5rem;
                line-height: 1rem;
                text-align: right;
                font-size: 0.6rem;
            }
        }
    }


</style>

<template>
    <view class="message-container">
        <view class="bottom-con">
            <view
                    class="message-card"
                    v-for="message in messageList"
                    :v-key="message.noticeId"
                    @click="readMessage(message.noticeId)"
            >
                <view class="message-title">
                    <text class="message-title-inner">{{message.title}}</text>
                    <view>{{message.time}}</view>
                </view>
                <view class="message-content">{{message.content}}</view>
                <view class="isRead" :style="message.isRead ? 'color: green' : 'color: red'">{{message.isRead ? '已读' :
                    '未读'}}
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    import {mapState, mapGetters} from "vuex";
    import {myApi} from "@/utils/apiManager/myApi";
    import {errorCode} from "@/utils/errorCode/errorCode";
    import {loginModules} from "@/utils/apiManager/loginApi";

    export default {
        name: 'message',

        computed: {},

        data() {
            return {
                messageList: []

            }
        },

        onShow() {
            console.log('重新请求数据')
            this.getNotice()
        },

        methods: {
            getNotice() {
                myApi.getNotice().then(res => {
                    if (res.code == 1) {
                        this.messageList = res.data
                    } else {
                        errorCode()
                    }
                })
            },

            readMessage(noticeId) {
                uni.navigateTo({
                    url: '/pages/index/userInfoPage/message/readMessage/readMessage?id='+noticeId
                })
            }
        }


    }
</script>


