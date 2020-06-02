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
        <view class="write-btn">删除笔友</view>
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
                        content: '2000km'
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

        mounted() {

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
                this.info[3].content = res.nickname
                this.imageUrl = 'http://island.hellochaos.cn/uploads/' + res.photo
            }
        }
    }
</script>

