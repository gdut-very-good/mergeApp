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
        transition: all .35s ease-in-out;
        text-align: center;

        .letter-card {
            border-radius: 6px;
            position: relative;
            display: inline-block;
            height: 65%;
            width: 70%;
            background-color: white;
            box-shadow: 10px 10px 5px #888888;
            margin: 20% 15% auto 15%;
            background-image: url("../../../../../static/maobi.png");
            background-repeat: no-repeat;
            background-position: center;
            background-size: 40%;

            .stamp-con {
                display: block;
                height: 3.5rem;
                width: 3rem;
                margin-left: 1rem;
            }

            .title {
                position: absolute;
                bottom: 0;
                height: 2rem;
                width: 100%;
                text-align: center;
                font-size: 0.8rem;
                color: #7fa3e4;
            }

            .send-time {
                display: flex;
                align-items: center;
                justify-content: center;
                white-space: normal;
                position: absolute;
                height: 1.3rem;
                padding: 0 1rem 0 1rem;
                background-color: #7fa3e4;
                color: white;
                right: 0.5rem;
                top: 0.5rem;
                font-size: 0.5rem;
            }
        }
    }

    .check-friend-info {
        top: 0;
        position: absolute;
        background-color: #2C405A;
        height: 2rem;
        width: 2rem;
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
                        v-for="item in letterList"
                        style="padding-top: 0.5rem;position: relative"
                        @touchstart.stop="touchStart"
                        @touchend.stop="touchEnd"
                        @click="readLetter(item.letter.letterId)"
                >
                    <image :src="item.stampId.url" class="stamp-con"></image>
                    <view class="title">{{item.letter.header}}</view>
                    <view class="send-time">{{item.nickname}}</view>
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
                isShow: true,
                userId: '',
                startX: '',
                endX: '',
                element: '',
                index: 0,
                leftValue: 0
            }
        },

        onLoad(options) {
            uni.setNavigationBarTitle({
                title: options.nickname
            });
            this.name = options.nickname
            this.userId = options.userId
            this.getLetterInfo(options)
            this.initWidth()
            this.element = document.getElementsByClassName('active')[0]
        },

        methods: {
            initWidth() {
                let bg = document.getElementsByClassName('bottom-con')[0]
                console.log(bg.style.width)
            },
            getLetterInfo(info) {
                letter.getFriendLetter(info.userId).then(res => {
                    console.log(res)
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
                const _this = this
                e.preventDefault() // 阻止默认事件，滚动等
                this.endX = e.changedTouches[0].clientX
                //大于0说明向左滑动，小于0说明向右滑动
                if (this.startX - this.endX > 40) {
                    this.index++
                    this.leftValue = -this.index * windowWidth + 'px'
                } else if (this.startX - this.endX < -40){
                    this.index--
                    this.leftValue = -this.index * windowWidth + 'px'
                }
                this.startX = 0
                this.endX = 0
            },

            doNothing() {
                console.log('nihao')
            },

            readLetter(letterId) {
                uni.navigateTo({
                    url: '/pages/index/letter/writerLetter/letterMessage/readLetter/readLetter?id=' + letterId,
                })
            },


        }
    }
</script>

