<style scoped lang="less">
    @bgColor: rgb(242, 242, 242);
    .letter-message {
        height: 100vh;
        width: 100%;
        background-color: @bgColor;
    }

    .bottom-con {
        height: 100%;
        width: 90%;
        margin: auto;

        .no-letter {
            height: 3rem;
            width: 100%;
            line-height: 3rem;
            text-align: center;
        }

    }

    .active {
        position: absolute;
        white-space: nowrap;
        height: 100%;
        width: 100%;
        transition: all .35s ease-in-out;
        text-align: center;

        .letter-card{
            border-radius: 6px;
            position: relative;
            display: inline-block;
            height: 65%;
            width: 70%;
            background-color: white;
            box-shadow: 10px 10px 5px #888888;
            margin: 20% 15% auto 15%;

            .letter-bg {
                left: 0;
                top: 0;
                position: absolute;
                height: 100%;
                width: 100%;
            }

            .stamp-con {
                display: block;
                height: 3.5rem;
                width: 3rem;
                margin-left: 1rem;
            }

            .content {
                position: absolute;
                width: 90%;
                left: 5%;
                margin: auto;
                white-space: normal;
                margin-top: 1rem;
                color: #9a6060;
                text-align: left;
            }

            .title {
                position: absolute;
                bottom: 0;
                height: 4rem;
                width: 100%;
                text-align: center;
                font-size: 0.8rem;
                color: black;
            }

            .send-time {
                display: flex;
                align-items: center;
                justify-content: center;
                white-space: normal;
                position: absolute;
                height: 1.3rem;
                padding: 0 1rem 0 1rem;
                background-color: #ffc300;
                color: white;
                right: 0.5rem;
                top: 0.5rem;
                font-size: 0.5rem;
                border-radius: 3px;
            }
        }
    }


    .index-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        bottom: 5%;
        left: 0;
        height: 2rem;
        width: 100%;
        .index-point {
            height: 0.8rem;
            width: 0.8rem;
            border-radius: 50%;
            margin:0 0.3rem 0 0.3rem;
        }
    }

    .submit-btn {
        position: fixed;
        bottom: 10rem;
        right: 2rem;
        height: 2.5rem;
        width: 2.5rem;
        border-radius: 50%;
        background-color: #ffc300;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 100;

        .save-image {
            height: 1.5rem;
            width: 1.5rem;
            border-radius: 50%;
        }
    }

    .envelope {
        top: 0;
        left: 0;
        position: absolute;
        height: 15rem;
        width: 100%;
        z-index: -1;
    }
</style>

<template>
    <view class="letter-message">
        <view class="submit-btn" @click="showFriend">
            <image class="save-image" src="../../../../../static/person.png"></image>
        </view>
        <view class="bottom-con" @touchmove.stop.prevent = "doNothing">
            <view class="no-letter" v-if="!isShow">你们还没有书信来往</view>
            <view
                    class="active"
                    id="activeX"
                    :style="'left:' + leftValue"
            >
                <view
                        class="letter-card"
                        v-for="(item, index) in letterList"
                        style="padding-top: 0.5rem;position: relative"
                        @touchstart.stop="touchStart"
                        @touchend.stop="touchEnd"
                        @click="readLetter(item.letter.letterId)"
                >
                    <image :src="'../../../../../static/letter_'+(index % 6)+'.jpg'" class="letter-bg"></image>
                    <image :src="item.stampId.url" class="stamp-con"></image>
                    <view class="title"><span style="font-size: 0.8rem">寄信人:</span><span style="color: #174b6b;font-size: 1rem">{{item.letter.header}}</span></view>
                    <view class="content">
                        <text>
                            {{content(item.letter.content)}}
                        </text>
                    </view>
                    <view class="send-time">{{item.nickname}}</view>
                </view>
            </view>
            <view class="index-btn">
                <view class="index-point" :style="index==number?'background-color: #3d49ca;':'background: rgba(0,0,0,0.5);'" v-for="(item, number) in letterList"></view>
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
                isShow: true,
                userId: '',
                startX: '',
                endX: '',
                element: '',
                index: 0,
                leftValue: 0,
            }
        },

        computed: {

        },

        onLoad(options) {
            uni.setNavigationBarTitle({
                title: options.nickname
            });
            this.name = options.nickname
            this.userId = options.userId
            this.getLetterInfo(options)
        },

        methods: {
            getLetterInfo(info) {
                letter.getFriendLetter(info.userId).then(res => {
                    if (res.code == 1) {
                        if (res.data.records.length !== 0) {
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
                for (let i = 0; i < this.letterList.length; i++) {
                    this.letterList[i].stampId = matchId(this.letterList[i].stampName)
                    letter.getSingleInfo(this.letterList[i].receiverId).then(res => {
                        this.letterList[i].receiverId = res.data
                    })
                }
            },

            showFriend() {
                uni.navigateTo({
                    url: '/pages/index/letter/writerLetter/friendInfo/friendInfo?id=' + this.userId
                })
            },

            touchStart(e) {
                e.preventDefault() // 阻止默认事件，滚动等
                this.startX = e.touches[0].clientX // 记录滑动开始的位置
            },

            touchEnd(e) {
                const {windowWidth} = uni.getSystemInfoSync();
                e.preventDefault() // 阻止默认事件，滚动等
                this.endX = e.changedTouches[0].clientX
                //大于0说明向左滑动，小于0说明向右滑动
                if (this.startX - this.endX > 40) {
                    if (this.index === this.letterList.length - 1) {
                        return;
                    }
                    this.index++
                    this.leftValue = -this.index * windowWidth + 'px'
                } else if (this.startX - this.endX < -40) {
                    if (this.index === 0) {
                        return
                    }
                    this.index--
                    this.leftValue = -this.index * windowWidth + 'px'
                }
                this.startX = 0
                this.endX = 0
            },

            doNothing() {
            },

            readLetter(letterId) {
                uni.navigateTo({
                    url: '/pages/index/letter/writerLetter/letterMessage/readLetter/readLetter?id=' + letterId,
                })
            },

            content(value) {
                if (value.length < 30) {
                    return value
                } else {
                    return value.substring(0, 30) + '...'
                }
            }


        }
    }
</script>

