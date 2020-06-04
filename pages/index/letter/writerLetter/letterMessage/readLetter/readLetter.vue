<style scoped lang="less">
    @lineHeight: 35px;
    .letter-message {
        width: 90%;
        margin: auto;
    }

    image {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        z-index: -1;
        opacity: 0.3;
    }

    .content-container {
        position: relative;
        height: auto;
        .real-line {
            width: 100%;
            position: absolute;
            z-index: 100;
            top: 0;
            left: 0;
        }
    }

    .content {
        height: auto !important;
        font-size: 15px;
        line-height: @lineHeight+1;
    }


    .line {
        height: @lineHeight;
        width: 100%;
        line-height: @lineHeight;
        font-size: 15px;
        border-bottom: 1px solid #1c176b;
    }

    .writer {
        text-align: right !important;
    }

    .time {
        text-align: right !important;
    }

</style>

<template>
    <view class="letter-message">
        <image src="../../../../../../static/letter/letterpaper.png"></image>
        <view class="line">亲爱的: {{receiverName}}</view>
        <view ref="desc" class="content-container">
            <view class="content">{{content}}</view>
            <view class="real-line">
                <view class="line" v-for="list in line"></view>
            </view>
        </view>
        <view class="line writer">{{acceptName}}</view>
        <view class="line time">{{time}}</view>
    </view>
</template>

<script>
    import {letter} from "@/utils/apiManager/letterApi";
    import {errorCode} from "../../../../../../utils/errorCode/errorCode";

    export default {
        name: 'letterMessage',

        data() {
            return {
                id: '',
                time: '',
                header: '',
                content: '',
                line: '',
                acceptName: '',
                receiverName: ''
            }
        },

        onLoad(options) {
            this.id = options.id
            this.getLetterInfo()

        },

        watch: {
            'content': function () {
                console.log('监控到了变化')
                this.$nextTick(function () {
                    const _this = this
                    let info = uni.createSelectorQuery().select(".content-container");
                    info.boundingClientRect(function(data) { //data - 各种参数
                        console.log(data.height)  // 获取元素宽度
                        const lineNum = Math.floor(data.height / 35)
                        _this.line = lineNum
                        console.log(_this.line)
                    }).exec()
                })
            }
        },

        methods: {
            getLetterInfo() {
                letter.getSingleLetter(this.id).then(res => {
                    if (res.code == 1) {
                        this.receiverName = res.data.receiverName
                        this.acceptName = res.data.nickname
                        this.time = res.data.letter.sendTime
                        this.content = res.data.letter.content
                        console.log(this.$refs.desc)

                    } else {
                        errorCode(res)
                    }
                })
            }
        }
    }
</script>

