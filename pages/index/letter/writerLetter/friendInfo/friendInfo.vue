<style scoped lang="less">
    @bgColor: rgb(242,242,242);
    .friend-con {
        height: 100vh;
        background-color: @bgColor;
    }

    .bottom-con {
        @bottomHeight: 6rem;
        @itemNum: 4;
        height: @bottomHeight;
        background-color: white;
        display: flex;
        flex-direction: row;
        padding: 0.5rem 0 0.5rem 0;
        .head-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            width: 30%;
            .icon {
                border: 1px solid black;
                height: 4rem;
                width: 4rem;
                border-radius: 50%;
            }
        }
        .info-con {
            height: 100%;
            width: 70%;
            .item {
                height: 25%;
                font-size: 0.8rem;
                line-height: @bottomHeight/@itemNum;
            }
        }
    }

    .write-btn {
        line-height: 2.5rem;
        background-color: white;
        text-align: center;
        font-size: 0.8rem;
        margin-top: 0.5rem;
    }



</style>

<template>
    <view class="friend-con">
        <view class="bottom-con">
            <view class="head-icon">
                <image class="icon" :src="imageUrl"></image>
            </view>
            <view class="info-con">
                <view class="item" v-for="item in info">
                    {{item.name}}{{item.content}}
                </view>
            </view>
        </view>
        <view class="write-btn" @click="deleteFri">删除笔友</view>
    </view>
</template>

<script>
    import {letter} from "@/utils/apiManager/letterApi";
    import {errorCode} from "@/utils/errorCode/errorCode";

    export default {
        name: 'friendInfo',

        data() {
            return {
                imageUrl: '',
                info: [
                    {
                        name: '',
                        content: ''
                    },
                    {
                        name: '签名:',
                        content: ''
                    },
                    {
                        name: '位置:',
                        content: ''
                    },
                    {
                        name: '距离:',
                        content: ''
                    },
                ],
                userId: ''
            }
        },

        onLoad(option) {
            this.userId = option.id
            console.log(this.userId)
            this.getInfo()
        },

        methods: {
            getInfo() {
                letter.getSingleInfo(this.userId).then(res => {
                    console.log(res)
                    if (res.code == 1) {
                        this.initInfo(res.data)
                    } else {
                        errorCode(res)
                    }
                })
            },

            initInfo(res) {
                this.info[0].content = res.nickname
                this.info[1].content = res.signature
                this.info[2].content = res.city
                this.info[3].content = res.distance > 1000 ? Math.floor(res.distance / 1000) + '公里' : res.distance + '米'
                this.imageUrl = 'http://island.hellochaos.cn/uploads/' + res.photo
            },

            deleteFri() {
                const _this = this
                uni.showModal({
                    title: '提示',
                    content: '你确定要删除好友吗',
                    success (res) {
                        if (res.cancel) {
                            //点击取消,默认隐藏弹框
                        } else {
                            letter.deleteFriend(_this.userId).then(res => {
                                if (res.code == 1) {
                                    uni.showToast({
                                        title: '删除成功'
                                    })
                                    setTimeout(() => {
                                        uni.reLaunch({
                                            url: '/pages/index/letter/writerLetter/writerLetter',
                                        })
                                    }, 500)
                                } else {
                                    errorCode(res)
                                }

                            })
                        }
                    }
                })
            }
        }
    }
</script>

