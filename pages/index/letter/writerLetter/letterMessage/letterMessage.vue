<style scoped lang="less">

    .bottom-con {
        width: 90%;
        margin: auto;

        .no-letter {
            height: 3rem;
            width: 100%;
            line-height: 3rem;
            text-align: center;
        }

        .letter-card {
            position: relative;
            border: 1px solid black;

            .stamp {
                position: absolute;
                top: 0;
                right: 0;
                width: calc(25% - 0.4rem);
                height: 5rem;
            }

            .letter-title {
                @titleHeight: 2rem;
                height: @titleHeight;
                width: 50%;
                padding-left: 0.4rem;
                line-height: @titleHeight;
                font-size: 0.6rem;
            }

            .letter-content {
                height: 6rem;
                width: 70%;
                font-size: 0.4rem;
                margin-left: 0.4rem;
                overflow: scroll;
            }

            .receiver-con {
                display: flex;
                flex-direction: row;
                height: 1.5rem;
                margin: 0 0.2rem 0 0.2rem;
                align-items: center;
                font-size: 0.4rem;

                .receiver-name {
                    line-height: 1rem;
                    height: 100%;
                    width: 50%;
                    margin-left: 1rem;
                }

            }
        }
    }
</style>

<template>
    <view class="letter-message">
        <view class="bottom-con">
            <view class="no-letter" v-if="!isShow">你们还没有书信来往</view>
            <view v-for="item in letterList" style="padding-top: 0.5rem" v-if="isShow">
                <view class="letter-card">
                    <image class="stamp" :src="item.stampId.url"></image>
                    <view class="letter-title">{{item.letter.header}}</view>
                    <view class="letter-content">
                        {{item.letter.content}}
                    </view>
                    <view class="receiver-con">
                        <view class="receiver-name">{{item.nickname}}</view>
                        <view class="receiver-name" style="text-align: right">{{item.letter.sendTime}}</view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    import {letter} from "@/utils/apiManager/letterApi";
    import {errorCode} from "@/utils/errorCode/errorCode";
    import {matchId} from "@/utils/stampStyle/stampStyle";

    export default {
        name: 'letterMessage',

        data() {
            return {
                letterList: [],
                name: '',
                isShow: true
            }
        },

        onLoad(options) {
            uni.setNavigationBarTitle({
                title: options.nickname
            });
            this.name = options.nickname
            this.getLetterInfo(options)
        },

        methods: {
            getLetterInfo(info) {
                letter.getFriendLetter(info.userId).then(res => {
                    console.log(res)
                    if (res.code == 1) {
                        if (res.data.records.length !== 0) {
                            //todo stampId可能会有未定义的情况
                            this.letterList = res.data.records
                            this.reformat()
                        } else {
                            this.isShow = false
                        }
                    } else {
                        errorCode(res.code)
                    }


                })
            },

            reformat() {
                for(let i = 0; i < this.letterList.length; i++) {
                    this.letterList[i].stampId = matchId(this.letterList[i].stampName)
                    console.log(this.letterList)
                    letter.getSingleInfo(this.letterList[i].receiverId).then(res => {
                        this.letterList[i].receiverId = res.data
                    })
                }
            }
        }
    }
</script>

