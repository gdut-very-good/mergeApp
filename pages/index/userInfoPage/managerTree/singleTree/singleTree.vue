<style scoped lang="less">
    input {
        outline: none;
    }

    .shudong-second-title {
        @height: 2.5rem;
        height: @height;
        line-height: @height;
        width: 95%;
        margin: auto;
        font-size: 1rem;
        border-bottom: 1px solid gainsboro;
    }

    .text-area view {
        height: 50vh;
        width: 95%;
        margin: 0.3rem auto auto;
        font-size: 1rem;
    }

    .delete-btn {
        height: 2rem;
        width: 80%;
        margin: auto;
        background-color: red;
        line-height: 2rem;
        font-size: 0.8rem;
        color: white;
        border-radius: 6px;
        text-align: center;
    }

    .leaving-message {
        .message-content {
            height: 1rem;
            text-align: center;
            font-size: 1rem;
        }
    }


</style>

<template>
    <view>
        <view class="bottom-con">
            <view class="shudong-second-title">{{treeHole.title}}</view>
            <view class="text-area">
                <view>{{treeHole.content}}</view>
            </view>
            <view class="leaving-message">
                <view class="message-content"></view>
            </view>
            <view class="delete-btn" @click="deleteTree">删除</view>
        </view>
    </view>
</template>

<script>
    import {letter} from "@/utils/apiManager/letterApi";
    import {errorCode} from "@/utils/errorCode/errorCode";
    import {myApi} from "@/utils/apiManager/myApi";
    import {loginModules} from "@/utils/apiManager/loginApi";

    export default {
        name: 'singleTree',

        data() {
            return {
                treeHole: {},
                id: ''
            }
        },

        onLoad(options) {
            this.id = JSON.parse(options.id)
            this.getTreeInfo()
        },

        methods: {
            //获得树洞信息
            getTreeInfo() {
                myApi.getSingleTreeHole(this.id).then(res => {
                    console.log(res.data)
                    this.treeHole = res.data.hole
                    if (!res.code) {
                        errorCode()
                    }
                })
            },

            deleteTree() {
                myApi.deleteTree(this.id).then(res => {
                    if (res.code == 1) {
                        uni.showToast({
                            title: '删除成功'
                        })
                        setTimeout(() => {
                            uni.navigateBack()
                        }, 500)
                    } else {
                        errorCode(res)
                    }
                })
            }
        }

    }
</script>

