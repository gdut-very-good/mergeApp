<style scoped lang="less">
    @bgColor: rgb(242,242,242);
    .bottom-con {
        width: 90%;
        margin: auto;
        .message-card {
            @messageBox: 3rem;
            @item: 2;
            height: @messageBox;
            font-size: 0.8rem;
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
                width: 55%;
            }

            .message-content {
                height: 50%;
                font-size: 0.8rem;
                line-height: @messageBox / @item;
            }
        }
    }
</style>

<template>
    <view>
        <view class="bottom-con">
            <view
                    class="message-card"
                    v-for="tree in treeList"
                    :v-key="tree.creatorId"
                    @click="single(tree.treeHoleId)"
            >
                <view class="message-title">
                    <text class="message-title-inner">{{tree.title}}</text>
                    <view style="font-size: 0.7rem">{{tree.createTime}}</view>
                </view>
                <view class="message-content">{{content(tree.content)}}</view>
            </view>
        </view>
    </view>
</template>

<script>
    import {myApi} from "@/utils/apiManager/myApi";
    import {loginModules} from "@/utils/apiManager/loginApi";
    import {errorCode} from "../../../../utils/errorCode/errorCode";

    export default {
        name: 'managerTree',

        data() {
            return {
                treeList: [

                ]
            }
        },

        onShow() {
            this.getTreeList()
        },

        methods: {
            single(id) {
                uni.navigateTo({
                    url: '/pages/index/userInfoPage/managerTree/singleTree/singleTree?id=' + id,
                    fail(res) {
                        console.log(res)
                    }
                })
            },

            getTreeList() {
                myApi.getMyTreeHole().then(res => {
                    console.log(res)
                    if (res.code == 1) {

                    } else {
                        errorCode(res)
                    }
                    this.treeList = res.data
                })
            },

            content(value) {
                if (value.length < 0) {
                    return value
                } else {
                    return value.substring(0, 20) + '...'
                }
            }

        }
    }
</script>

