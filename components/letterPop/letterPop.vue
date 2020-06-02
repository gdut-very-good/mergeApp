<style scoped lang="less">
    .contact-con {
        width: 80%;
        margin: auto;
        border: 1px solid black;
        border-radius: 10px;
        background-color: white;
		padding-bottom: 2rem;

        .contact-title {
            @titleHeight: 2rem;
            height: @titleHeight;
            line-height: @titleHeight;
            text-align: center;
            font-size: 1rem;
        }

        .contact-list {
            max-height: 6rem;
            overflow: scroll;

            .list-item {
                height: 1rem;
                line-height: 1rem;
                text-align: center;
				font-size: 0.8rem;
            }
        }
    }

    .btn-con {
        height: 1rem;
        flex-direction: row;
        display: flex;
        justify-content: center;
		margin-top: 1rem;

        .confirm-btn {
            height: 100%;
            line-height: 1rem;
            width: 30%;
            text-align: center;
            border: 1px solid black;
            border-radius: 10px;
            margin: 0 0.3rem 0 0.3rem;
        }
    }
</style>

<template>
    <layer :style="isShow?'display:flex':'display:none'">
        <view class="contact-con">
            <view class="contact-title">邮票</view>
            <view class="contact-list">
                <view
                        class="list-item"
                        v-for="item in list"
                        @click="chooseItem(item.stampName)"
                        :style="item.stampName===chooseStamp.stampName?'color:#238FFF':'color:black'"
                >
                    {{item.stampName}}
                </view>
            </view>
            <view class="btn-con">
                <view class="confirm-btn" @click="cancel('cancel')">取消</view>
                <view class="confirm-btn" @click="cancel('sure')">确认</view>
            </view>
        </view>
    </layer>
</template>

<script>
    import layer from "@/components/layer/layer";
    import {stamp, matchId, getUserStamp} from "@/utils/stampStyle/stampStyle";
	import {letterInformation} from "@/utils/userInfo/letterInfo"
    import {letter} from "../../utils/apiManager/letterApi";
    import {errorCode} from "../../utils/errorCode/errorCode";

    export default {
        name: 'letterPop',

        props: ['letterShow'],

        components: {
            layer
        },

        watch: {
            'letterShow': function (value) {
                this.isShow = this.letterShow
            }
        },

        data() {
            return {
                list: [],
                isShow: this.letterShow,
                chooseStamp: ''
            }
        },

        mounted() {
            this.initStamp()
        },

        methods: {
            initStamp() {
                letter.getUserStamp().then(res => {
                    if (res.code == 1) {
                        this.list = getUserStamp(res.data.records)
                        this.chooseStamp = this.list[0]
                    } else {
                        errorCode(res)
                    }
                })
            },

            chooseItem(stampName) {
				letterInformation.info.stampId = stampName
                this.chooseStamp = matchId(stampName)
            },

            cancel(option) {
                console.log(option)
                if (option === 'sure') {
                    this.$emit('closeStamp', {
                        url: this.chooseStamp.url,
						stampId: this.chooseStamp.stampId[0]
                    })
                } else {
                    this.$emit('closeStamp',{
                        url: null
                    })
                }
            }

        }

    }
</script>


