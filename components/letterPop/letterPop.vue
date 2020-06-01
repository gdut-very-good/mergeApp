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
    import {stamp, matchId} from "@/utils/stampStyle/stampStyle";
	import {letterInformation} from "@/utils/userInfo/letterInfo"

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
                list: stamp,
                isShow: this.letterShow,
                chooseStamp: stamp[0]
            }
        },

        methods: {
            chooseItem(stampName) {
				letterInformation.info.stampId = stampName
                this.chooseStamp = matchId(stampName)
            },

            cancel(option) {
                console.log(option)
                if (option === 'sure') {
                    this.$emit('closeStamp', {
                        url: this.chooseStamp.url,
						stampId: this.chooseStamp.stampId
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


